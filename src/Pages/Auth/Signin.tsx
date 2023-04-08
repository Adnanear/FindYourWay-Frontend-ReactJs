import { Flex, PaperContainer } from '@/Components/Containers';
import { Link } from '@/Components/Controllers';
import { LoadingButton } from '@/Components/Controllers/LoadingButton';
import { User } from '@/Entities/UserEntities';
import { HttpResponseError } from '@/Utils/Types';
import { createYupResolver } from '@/Utils/YupResolver';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignin } from './api/queries';

const resolver = createYupResolver((yup) =>
  yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
);

export const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string>();

  const { control, handleSubmit } = useForm<User>({
    mode: 'onChange',
    resolver,
  });

  const { mutate: signin, isLoading } = useSignin();

  const onSubmit = useCallback((data: User) => {
    signin(data, {
      onSuccess: () => {
        navigate(`/`);
      },

      onError: (err) => {
        const error = err as HttpResponseError;
        setSubmitError(error.response?.data?.message);
      },
    });
  }, []);

  return (
    <Flex sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <PaperContainer sx={{ width: 'clamp(20rem, 50vw, 30rem)', p: 6 }}>
        <Box textAlign='center' py={3}>
          <Typography variant='h1' mb={1}>
            Sign In
          </Typography>
          <Typography variant='body1'>
            Login to your account to access, don't have an account?{' '}
            <Link to='/auth/register'>create a new account</Link>
          </Typography>
        </Box>
        <Divider />
        <Flex
          component='form'
          id='login-form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ py: 4, flexWrap: 'wrap', gap: 1 }}
        >
          {!!submitError && <Typography sx={{ color: 'error.main' }}>{submitError}</Typography>}
          <Controller
            control={control}
            name='username'
            render={({ field, fieldState: { error } }) => (
              <FormControl sx={{ flexBasis: '100%' }}>
                <FormLabel htmlFor={field.name}>Username</FormLabel>
                <TextField id={field.name} {...field} error={!!error} />
                {error && (
                  <FormHelperText sx={{ color: '#ff0000' }}>{error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field, fieldState: { error } }) => (
              <FormControl sx={{ flexBasis: '100%' }}>
                <FormLabel htmlFor={field.name}>Password</FormLabel>
                <TextField id={field.name} {...field} type='password' error={!!error} />
                {error && (
                  <FormHelperText sx={{ color: '#ff0000' }}>{error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Stack mt={2} flexBasis='100%' gap='inherit'>
            <LoadingButton sx={{ py: '.5em', fontSize: '1em' }} type='submit' loading={isLoading}>
              Login
            </LoadingButton>
            <Link to='/auth/signup'>
              <Button variant='outlined' color='info' fullWidth>
                Create an account
              </Button>
            </Link>
          </Stack>
        </Flex>
      </PaperContainer>
    </Flex>
  );
};
