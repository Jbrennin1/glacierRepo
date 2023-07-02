import React, {useState,useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import questionsAnswersSlice from '../../reducers/questionsAnswersSlice.js'
import { apiPostRequest } from "../../helpers/api.js";
import { apiLocalPostRequest } from '../../helpers/api.js';
import { object, string, number, mixed, boolean, array } from "yup";
import axios from 'axios';

let newAnswerSchema = object().shape({
  body: string().required('Required').min(1).max(1000),
  name: string().required().max(60),
  email: string().email().required().max(60),

});

const AddAnswerForm = ({ product, question, setAnswerForm }) => {

  const answeringQuestion = useSelector(state => {
    return state.questionsAnswersReducer.answeringQuestion;
  });

  const token = process.env.API_KEY;
  const headers = {
    'Authorization': token
  };

  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [newAnswer, setNewAnswer] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
    questionId: question.question_id
  });

  const newAnswerRender = {
    body: newAnswer.body,
    date: Date.now(),
    answerer_name: newAnswer.name,
    helpfulness: 0,
    photos: [],
  };


  var handleAnswerSubmit = () => {

    const formData = new FormData();
    Array.from(newAnswer.photos).forEach((photo) =>
      formData.append('photos', photo)
    );
    delete newAnswer.photos;
    Object.keys(newAnswer).forEach((key) => {

      formData.append(key, JSON.stringify(newAnswer[key]));
    });

    Array.from(formData).forEach((val) =>
      console.log(val, formData[val])
    );

    setAnswerForm(false);

    if (!loading) {
      apiLocalPostRequest('/answers', formData)
    .then(async (res) => {
      let images = res.data.photos;
      newAnswerRender.photos = images;

      if (res.status === 201) {
        dispatch(questionsAnswersSlice.actions.addAnswer({ questionId: question.question_id, answer: newAnswerRender}));
      }
    }).catch((err) => {
      console.log('error occured when try to add a new answer', err);
    }).finally(() => setLoading(false));
    }
  };

  // validate functions
  var validateAnswer = () => {
    const errors = {};

    try {
      newAnswerSchema.validateSync(newAnswer, { abortEarly: false });
    } catch (validationErrors) {
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
    }

    if (!newAnswer.body) {
      errors.body = 'Required';
    }
    if (!newAnswer.name) {
      errors.name = 'Required';
    }
    if (!newAnswer.email) {
      errors.email = 'Required';
    }

    if (newAnswer.name !== undefined) {
      if (newAnswer.name.length > 60) {
        errors.nameLength = 'Your nickname must be shorter than 60 characters';
      }
    }

    return errors;
  };



  const onAnswerChange = (e) => {
    setNewAnswer(prevState => ({ ...prevState, body: e.target.value }));
  };

  const onNicknameChange = (e) => {
    setNewAnswer(prevState => ({ ...prevState, name: e.target.value }));
  };

  const onEmailChange = (e) => {
    setNewAnswer(prevState => ({ ...prevState, email: e.target.value }));
  };


  var handlePhotoUpload = (e) => {
    if (e.target.files) {
      let photo = e.target.files[0];
      newAnswer.photos.push(photo);

    } else {
      return;
    }
  };

  return (
    <div>
      <h2 className='text-center font-bold'>Submit Your Answer
        <h3>{product.name}: {answeringQuestion.question_body}</h3>
      </h2>
      <Formik
      initialValues={{
        body:'',
        nickname: '',
        email: '',
      }}

      validate={validateAnswer}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          validateAnswer()
          handleAnswerSubmit();
        }, 400);
      }}
      >
        <Form>
          <h2 className='py-20 flex h-full flex-col justify-end'>
          {(validateAnswer().body) ? <small className='text-center text-red-500'>An answer is required</small>: <div className='text-base-300'>_</div>}
            <label className='label' htmlFor='body'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Answer:</span>
            </label>
            <textarea module='answerField|QA' onChange={onAnswerChange} className='textarea rounded-none textarea-primary h-20 bg-base-300' id='body' name='body' />
          </h2>

          <h2 className='py-5 text-center'>
          {(validateAnswer().name) ? <small className='text-center text-red-500'>A nickname is required</small>:<div className='text-base-300'>_</div>}
          {(validateAnswer().nameLength) ? <small className='text-center text-red-500'>Nickname must be less than 60 characters</small>: null}
            <label className='label'htmlFor='nickname'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Nickname:</span>
            </label>
            <input module='nicknameAnswer|QA' onChange={onNicknameChange} className='input rounded-none input-primary w-full bg-base-300' id='nickname' name='nickname' placeholder='Example: jack543!' />
            <p><small>For privacy reasons, do not use your full name or email address.</small></p>
          </h2>

          <h2 p className='py-5 text-center'>
          {(validateAnswer().email) ? <small className='text-center text-red-500'>An email is required</small>: <div className='text-base-300'>_</div>}
            <label className='label' htmlFor='email'>
              <span className='label-text flex flex-row justify-center w-full text-lg'>Email:</span>
            </label>
            <input module='emailAnswer|QA' onChange={onEmailChange} className='input rounded-none input-primary w-full bg-base-300' id='email' name='email' type='email' placeholder='Example: jack@email.com' />
            <p p className='py-1'><small>For authentication reasons, you will not be emailed.</small></p>
          </h2>
          <div className='text-center'>
            <p p className='py-2'>
              <label className='btn rounded-none btn-base-300 hover:cursor-pointer' htmlFor='files'>Upload Photos</label>
              <input module='photoUpload|QA' className="w-[350px] hidden" type='file' id='files' onChange={handlePhotoUpload} multiple={true} />
              <p>
                {(newAnswer.photos.length > 0) ? <small>{newAnswer.photos.length} selected</small> : <small>No Photos Attached</small>}
              </p>
            </p>
            <button module='submitAnswer|QA' className='btn rounded-none btn-base-300'>Submit</button>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default AddAnswerForm;