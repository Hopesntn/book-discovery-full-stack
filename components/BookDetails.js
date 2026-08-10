import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { favouritesAtom } from '@/store';
import {
  addToFavourites,
  removeFromFavourites,
} from '@/lib/userData';

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId) || false);
  }, [favouritesList, workId]);

  async function favouritesClicked() {
    setIsUpdating(true);
    const updatedFavourites = showAdded
      ? await removeFromFavourites(workId)
      : await addToFavourites(workId);
    setFavouritesList(updatedFavourites);
    setIsUpdating(false);
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <Image
            onError={(event) => {
              event.currentTarget.src =
                'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt={`Cover of ${book.title}`}
            width={400}
            height={600}
            sizes="(max-width: 991px) 100vw, 33vw"
          />
          <br />
          <br />
        </Col>
        <Col lg="8">
          <h3>{book.title}</h3>
          {book.description && (
            <p>
              {typeof book.description === 'string'
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.subject_people && (
            <>
              <br />
              <h5>Characters</h5>
              {book.subject_people.join(', ')}
              <br />
              <br />
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(', ')}
              <br />
              <br />
            </>
          )}

          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link) => (
                <span key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {showFavouriteBtn && (
            <>
              <br />
              <Button
                variant={showAdded ? 'primary' : 'outline-primary'}
                onClick={favouritesClicked}
                disabled={isUpdating}
              >
                {showAdded ? '+ Favourite (added)' : '+ Favourite'}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
