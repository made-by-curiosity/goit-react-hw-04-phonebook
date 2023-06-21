import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { AddButton, PhonebookForm, ErrorText } from './Form.styled';

const phoneRegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}?$/;

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegExp, {
      message: 'Разве это похоже на имя?',
      excludeEmptyString: false,
    })
    .required('Ну и как ты поймёшь без имени кому звонишь?'),
  number: yup
    .string()
    .matches(phoneRegExp, {
      message: 'Наведи на поле ввода номера, посмотри, что можно писать тут.',
      excludeEmptyString: false,
    })
    .required('А звонить в рельсу будем?'),
});

const initialValues = {
  name: '',
  number: '',
};

const ValidationError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const AddForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validationSchema={schema}
    >
      <PhonebookForm>
        <label htmlFor="name">
          <p>Name</p>
          <Field
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ValidationError name="name" />
        </label>
        <label htmlFor="number">
          <p>Number</p>
          <Field
            type="tel"
            name="number"
            title="Номер телефона должен состоять из цифр и может включать в себя пробелы, прочерки, скобки, и может начинаться с +"
          />
          <ValidationError name="number" />
        </label>
        <AddButton type="submit">Add Contact</AddButton>
      </PhonebookForm>
    </Formik>
  );
};

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
