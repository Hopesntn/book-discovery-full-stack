import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

let configured = false;

function configurePassport() {
  if (configured) return;

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
  }

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        if (!payload?._id || !payload?.userName) {
          return done(null, false);
        }

        return done(null, payload);
      }
    )
  );

  configured = true;
}

function runMiddleware(req, res, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
}

export async function authenticateRequest(req, res) {
  configurePassport();
  await runMiddleware(req, res, passport.initialize());

  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
      if (error) {
        reject(error);
      } else if (!user) {
        const unauthorized = new Error('Unauthorized');
        unauthorized.statusCode = 401;
        reject(unauthorized);
      } else {
        resolve(user);
      }
    })(req, res);
  });
}
