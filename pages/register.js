import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/PageHeader';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { userName: '', password: '', password2: '' },
  });

  async function submitForm({ userName, password, password2 }) {
    setError('');

    try {
      await registerUser(userName, password, password2);
      await router.push('/login');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <>
      <PageHeader text="Register" subtext="Register for an account." />
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
            autoComplete="new-password"
            isInvalid={Boolean(errors.password)}
            {...register('password', { required: 'Password is required.' })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="new-password"
            isInvalid={Boolean(errors.password2)}
            {...register('password2', {
              required: 'Please confirm your password.',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match.',
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </>
  );
}
