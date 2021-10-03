import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'App/hooks';
import { setName } from './registerSlice';

interface FormValues {
  name: string;
}

function Register() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const name = useAppSelector((state) => state.register.name);

  const onSubmit = useCallback(
    (values: FormValues) => {
      dispatch(setName(values.name));
      // TODO: 성공할 경우에만 리다이렉트하도록
      history.push('game');
    },
    [dispatch, history],
  );

  const initialValues: FormValues = useMemo(
    () => ({
      name,
    }),
    [name],
  );

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        id="name"
        isInvalid={!!(errors.name && touched.name)}
        isRequired
      >
        <FormLabel htmlFor="name">이름</FormLabel>
        <Input
          placeholder="이름 입력"
          value={values.name}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      {/* TODO: 캐릭터 선택 폼 */}
      <Button mt={4} type="submit" isLoading={isSubmitting}>
        게임 시작
      </Button>
    </form>
  );
}

export default Register;
