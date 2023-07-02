import React, {useState,useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import questionsAnswersSlice from '../../reducers/questionsAnswersSlice.js'
import { object, string, number, mixed, boolean, array } from "yup";
import { apiPostRequest } from "../../helpers/api.js";
import ButtonPair from '../sharedComponents/ButtonPair.js';
import axios from 'axios';

let newQuestionSchema = object().shape({
  body: string().required('Required').min(1).max(1000),
  name: string().required().max(60),
  email: string().email().required().max(60),

});

const AddQuestionForm = ({ product, setQuestionForm }) => {

  const token = process.env.API_KEY;
  const headers = {
    'Authorization': token
  };

  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState({
    body: '',
    name: '',
    email: '',
    product_id: product.id
  });

  var handleSubmitQuestion = (values) => {
    setQuestionForm(false);
    console.log('Submit!');
    console.log(product.id);

    if (!loading) {
      setLoading(true);
      console.log(newQuestion);
      axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions', newQuestion, {headers})
      .then(response => {
        console.log(response);
        dispatch(questionsAnswersSlice.actions.addQuestion(newQuestion));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      });
    }
  };

  var validateQuestion = () => {
    const errors = {};

    try {
      newQuestionSchema.validateSync(newQuestion, { abortEarly: false });
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
    }

    if (!newQuestion.body) {
      errors.body = 'Required';
    }
    if (!newQuestion.name) {
      errors.name = 'Required';
    }
    if (!newQuestion.email) {
      errors.email = 'Required';
    }

    if (newQuestion.name !== undefined) {
      if (newQuestion.name.length > 60) {
        errors.nameLength = 'Your nickname must be shorter than 60 characters';
      }
    }

    return errors;
  };

  const onQuestionChange = (e) => {
    setNewQuestion(prevState => ({ ...prevState, body: e.target.value }));
  };

  const onNicknameChange = (e) => {
    setNewQuestion(prevState => ({ ...prevState, name: e.target.value }));
  };

  const onEmailChange = (e) => {
    setNewQuestion(prevState => ({ ...prevState, email: e.target.value }));
  };


  return (
    <div>
      <div className='text-center font-bold text-2xl'>Ask a question
        <h2>About the {product.name}</h2>
      </div>
      <Formik
      initialValues={{
        question:'',
        nickname: '',
        email: '',
      }}

      validate={validateQuestion}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          handleSubmitQuestion(values)
        }, 400);
      }}
      >
        <Form>
          <h2 className='py-20 flex h-full flex-col justify-end'>
          {(validateQuestion().body) ? <small className='text-center text-red-500'>A question is required</small>: <div className='text-base-300'>_</div>}
            <label className='label' htmlFor='question'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Question:</span>
            </label>
            <textarea module='questionField|QA' onChange={onQuestionChange} className='textarea rounded-none textarea-primary bg-base-300' id='question' name='question' />
          </h2>

          <h2 className='py-5 text-center'>
          {(validateQuestion().name) ? <small className='text-center text-red-500'>A nickname is required</small>: <div className='text-base-300'>_</div>}
            <label className='label' htmlFor='nickname'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Nickname:</span>
            </label>
            <input module='nicknameQuestion|QA' onChange={onNicknameChange} className='input rounded-none input-primary w-full bg-base-300' id='nickname' name='nickname' placeholder='Example: jackson11!' />
            <p><small>For privacy reasons, do not use your full name or email address.</small></p>
          </h2>

          <h2 className='py-5 text-center'>
          {(validateQuestion().email) ? <small className='text-center text-red-500'>An email is required</small>: <div className='text-base-300'>_</div>}
            <label className='label' htmlFor='email'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Email:</span>
            </label>
            <input module='emailQuestion|QA' onChange={onEmailChange} className='input rounded-none input-primary w-full bg-base-300' id='email' name='email' type='email' placeholder='Why did you like the product or not?' />
            <p className='py-1'><small>For authentication reasons, you will not be emailed.</small></p>
          </h2>

          <div className='text-center'>
          <button module='submitQuestion|QA' className='btn rounded-none btn-base-300'>Submit</button>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default AddQuestionForm;