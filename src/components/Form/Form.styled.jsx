import styled from '@emotion/styled';
import { Form } from 'formik';

export const PhonebookForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddButton = styled.button`
  padding: 5px;

  display: inline-block;
  width: 150px;

  border: 1px solid gray;
  border-radius: 5px;
  transition: background-color 300ms ease-out, color 100ms ease-out;

  &:hover,
  &:focus {
    background-color: #aaa;
    color: #fff;
  }

  &:active {
    background-color: gray;
  }
`;

export const ErrorText = styled.p`
  color: red;
`;
