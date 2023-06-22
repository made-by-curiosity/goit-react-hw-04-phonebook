import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { AddButton, PhonebookForm, ErrorText } from './Form.styled';

// const phoneRegExp =
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}?$/;

// const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .matches(nameRegExp, {
//       message: 'Разве это похоже на имя?',
//       excludeEmptyString: false,
//     })
//     .required('Ну и как ты поймёшь без имени кому звонишь?'),
//   number: yup
//     .string()
//     .matches(phoneRegExp, {
//       message: 'Наведи на поле ввода номера, посмотри, что можно писать тут.',
//       excludeEmptyString: false,
//     })
//     .required('А звонить в рельсу будем?'),
// });

const initialValues = {
  defaultValues: {
    name: '',
    number: '',
  },
};

export const AddForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initialValues);

  return (
    <PhonebookForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        <p>Name</p>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </label>
      <ErrorText>{errors?.name?.message}</ErrorText>

      <label htmlFor="number">
        <p>Number</p>
        <input
          {...register('number', { required: 'Number is required' })}
          type="tel"
          title="Номер телефона должен состоять из цифр и может включать в себя пробелы, прочерки, скобки, и может начинаться с +"
        />
      </label>
      <ErrorText>{errors?.number?.message}</ErrorText>
      <AddButton type="submit">Add Contact</AddButton>
    </PhonebookForm>
  );
};

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
