import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import { PrimaryButton } from '@/components/forms/Buttons';
import { useAuthContext } from './AuthContext';

const baseSchema = {
  email: string()
    .required('Please enter an email address')
    .email('The email address needs to be valid.'),
  password: string()
    .required('Please enter a password')
    .min(4, 'The password needs to be at least 4 characters long.'),
};

const loginSchema = object(baseSchema);

const registerSchema = object({
  ...baseSchema,
  retypePassword: string()
    .required('Please type your password again.')
    .oneOf([ref('password')], 'The passwords did not match.'),
  firstName: string().required('Please tell us your first name.'),
  lastName: string().required('Please tell us your last name.'),
});

export function Auth() {
  const { pathname, state } = useLocation();
  let isRegister = true;
  if (pathname === '/login') {
    isRegister = false;
  }
  const { user, login } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      const path = state?.from ? state.from : '/';
      navigate(path);
    }
  }, [user, navigate, state]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  async function onSubmit(formData) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = isRegister ? '/register' : '/login';

    const { retypePassword, ...sendToServer } = formData;

    const data = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(sendToServer),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (!data.accessToken) {
      toast.error(data);
      return;
    }

    // put this into context
    toast.success("You've logged in successfully!")
    login(data);
  }

  return (
    <>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          {...register('email')}
          labelText="Email"
          errorMessage={errors?.email?.message}
        />
        <Input
          type="password"
          {...register('password')}
          labelText="Password"
          errorMessage={errors?.password?.message}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              {...register('retypePassword')}
              labelText="Retype Password"
              errorMessage={errors?.retypePassword?.message}
            />
            <Input
              type="text"
              {...register('firstName')}
              labelText="First Name"
              errorMessage={errors?.firstName?.message}
            />
            <Input
              type="text"
              {...register('lastName')}
              labelText="Last Name"
              errorMessage={errors?.lastName?.message}
            />
          </>
        )}

        <PrimaryButton className="col-start-2">
          {isRegister ? 'Register' : 'Login'}
        </PrimaryButton>
      </Form>
    </>
  );
}

function handleSubmit(submitFunc) {
  return function (e) {
    e.preventDefault();
    const data = getFormData();
    const isValid = validateInput(data);
    if (isValid) {
      submitFunc(data);
    }
  };
}
