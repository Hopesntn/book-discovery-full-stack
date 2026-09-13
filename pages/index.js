/********************************************************************************
* WEB422 – Assignment 3
import { useRouter } from 'next/router';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    router.push({
      pathname: '/books',
      query: Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== '')
      ),
    });
  }

  return (
    <>
      <PageHeader
        text="Search"
        subtext="Find books using Open Library by author, title, subject, language, or first publication year."
      />

      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter an author"
                className={errors.author ? 'is-invalid' : ''}
                {...register('author', { required: true })}
              />
              {errors.author && (
                <Form.Text className="text-danger">
                  Author is required.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a title"
                {...register('title')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a subject"
                {...register('subject')}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: eng"
                {...register('language')}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="first_publish_year">
              <Form.Label>First Published</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: 1979"
                {...register('first_publish_year')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}
