import Link from 'next/link';
import { Card } from 'react-bootstrap';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const response = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await response.json();

  return { props: { book: data } };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer - Fabricio Ortiz Fiallos" />

      <Card>
        <Card.Body>
          <p>
            I am a Seneca student building this Next.js application to explore
            books using the Open Library API. This project demonstrates routing,
            reusable components, static data fetching, and client-side API
            requests with SWR.
          </p>
          <p>
            The featured book is <em>The Colour of Magic</em> by Terry Pratchett,
            the first Discworld novel. I chose it because it is a well-known
            fantasy book with rich Open Library metadata that works well for this
            assignment.
          </p>
          <Link href="/works/OL453657W">View this book page</Link>
        </Card.Body>
      </Card>
      <br />

      <BookDetails
        book={props.book}
        workId="OL453657W"
        showFavouriteBtn={false}
      />
    </>
  );
}
