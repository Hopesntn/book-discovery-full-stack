import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="page-header border-0 shadow-sm">
        <Card.Body>
          <h1>{text}</h1>
          {subtext && <p className="mb-0 text-muted">{subtext}</p>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
