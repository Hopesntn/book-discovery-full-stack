import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    function updateToken() {
      setToken(readToken());
    }

    updateToken();
    router.events.on('routeChangeComplete', updateToken);
    window.addEventListener('authChange', updateToken);

    return () => {
      router.events.off('routeChangeComplete', updateToken);
      window.removeEventListener('authChange', updateToken);
    };
  }, [router]);

  async function logout() {
    removeToken();
    await router.push('/login');
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Fabricio Ortiz Fiallos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
            </Nav>
            {token ? (
              <Nav>
                <NavDropdown title={token.userName} id="user-nav-dropdown">
                  <NavDropdown.Item as={Link} href="/favourites">
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
