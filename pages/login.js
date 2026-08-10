import { useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/PageHeader';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

export default function Login() {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { userName: '', password: '' },
  });

  async function submitForm({ userName, password }) {
    setError('');

    try {
      await authenticateUser(userName, password);
      setFavouritesList(await getFavourites());
      await router.push('/');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <>
      <PageHeader text="Login" subtext="Log in to search and save books." />
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form onSubmit={handleSubmit(submitForm)} noValidate>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            autoComplete="username"
            isInvalid={Boolean(errors.userName)}
            {...register('userName', { required: 'User name is required.' })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.userName?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            isInvalid={Boolean(errors.password)}
            {...register('password', { required: 'Password is required.' })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </>
  );
}
