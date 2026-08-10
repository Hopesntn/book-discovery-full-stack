import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    type: [String],
    default: [],
  },
});

const globalForMongo = globalThis;

if (!globalForMongo.mongoConnection) {
  globalForMongo.mongoConnection = { promise: null };
}

export async function connect() {
  const connectionString =
    process.env.MONGO_URL || process.env.MONGO_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error('MongoDB connection string is missing');
  }

  if (!globalForMongo.mongoConnection.promise) {
    globalForMongo.mongoConnection.promise = mongoose
      .connect(connectionString, {
        dbName: process.env.MONGO_DB_NAME || 'users',
      })
      .catch((error) => {
        globalForMongo.mongoConnection.promise = null;
        throw error;
      });
  }

  await globalForMongo.mongoConnection.promise;
}

function getUserModel() {
  return mongoose.models.User || mongoose.model('User', userSchema);
}

export async function registerUser({ userName, password, password2 }) {
  if (!userName?.trim() || !password) {
    throw new Error('User name and password are required');
  }

  if (password !== password2) {
    throw new Error('Passwords do not match');
  }

  const User = getUserModel();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await User.create({
      userName: userName.trim(),
      password: passwordHash,
      favourites: [],
    });
  } catch (error) {
    if (error?.code === 11000) {
      throw new Error('User Name already taken');
    }

    throw new Error('There was an error creating the user');
  }

  return `User ${userName.trim()} successfully registered`;
}

export async function checkUser({ userName, password }) {
  if (!userName?.trim() || !password) {
    throw new Error('User name and password are required');
  }

  const User = getUserModel();
  const user = await User.findOne({ userName: userName.trim() });

  if (!user) {
    throw new Error(`Unable to find user ${userName}`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Incorrect password');
  }

  return user;
}

export async function getFavourites(userId) {
  const User = getUserModel();
  const user = await User.findById(userId).select('favourites').lean();

  if (!user) {
    throw new Error('User not found');
  }

  return user.favourites || [];
}

export async function addToFavourites(userId, workId) {
  const User = getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favourites: workId } },
    { new: true }
  )
    .select('favourites')
    .lean();

  if (!user) {
    throw new Error('User not found');
  }

  return user.favourites;
}

export async function removeFromFavourites(userId, workId) {
  const User = getUserModel();
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favourites: workId } },
    { new: true }
  )
    .select('favourites')
    .lean();

  if (!user) {
    throw new Error('User not found');
  }

  return user.favourites;
}
