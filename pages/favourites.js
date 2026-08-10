import { useAtom } from 'jotai';
import { Col, Row } from 'react-bootstrap';
import BookCard from '@/components/BookCard';
import PageHeader from '@/components/PageHeader';
import { favouritesAtom } from '@/store';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <PageHeader
        text="Nothing Here"
        subtext="Add a book to your favourites from any book details page."
      />
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
