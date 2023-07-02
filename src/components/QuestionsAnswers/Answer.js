import React, {useEffect, useState} from 'react';
import LoadMoreAnswers from './LoadMoreAnswers.js';
import Photos from '../sharedComponents/Photos.js';
import {useSelector, useDispatch} from 'react-redux';
import questionsAnswersSlice from '../../reducers/questionsAnswersSlice.js'
import { apiPutRequest } from "../../helpers/api.js";


const Answer = ({answers, QaStatus, loadMore, firstTwo, setLoadMore, loadMoreVisible, clickedQuestionIndex,setClickedQuestionIndex, index}) => {
  const dispatch = useDispatch();

  const [clickedAnswerId, setClickedAnswerId] = useState();
  const [reported, setReported] = useState(false);
  let answerId = Object.keys(answers);

  let [loading, setLoading] = useState(false);
  const [key, setKey] = useState(Date.now());

  var handleAnswerHelpfulClick = (e, answerId) => {
    console.log(answerId);
    if (!loading) {
      setLoading(true);
      apiPutRequest(`/qa/answers/${answerId}/helpful`)
        .then(() => {
          dispatch(questionsAnswersSlice.actions.incrementAnswerHelpfulness({ answerId: answerId }));
          setKey(Date.now());
        })
        .catch((err) => {
          console.log("error occured when trying to increase helpfulness", err);
        })
        .finally(() => setLoading(false));
    }
  };

  var handleAnswerReportClick = (e, id) => {
    setReported(true);
    setClickedAnswerId(id);

  };

  var handleLoadMoreAnswers = (e) => {
    e.preventDefault();
    setClickedQuestionIndex(index)
    setLoadMore(!loadMore);

  };

  return (
    <div key={key}>
      <div>
      {(loadMore && clickedQuestionIndex === index) ? <h4>
        {answerId.map((id, idx) => {
          return (
            <div key={id} className='container mx-auto py-4 px-2'>
              <p className='QAheader'><span>A: </span>{answers[id].body}</p>
              <Photos photos={answers[id].photos} custom={true} />
              <div className='px-4 flex flex-row'>
                <QaStatus data={{reviewer_name: answers[id].answerer_name, date: answers[id].date, helpfulCount: answers[id].helpfulness}}
                clickedAnswerId={clickedAnswerId}
                id={id}
                reported={reported}
                handleHelpfulClick={(e) => handleAnswerHelpfulClick(e, id)}
                handleReportClick={(e) => handleAnswerReportClick(e, id)}
                messageType='answer'/>
                {(reported && clickedAnswerId === id) ? <span className='inline'>Reported ✓</span> : null}
              </div>
            </div>
          );
        })}
        </h4> :
        <h4>
        {firstTwo.map((id, idx) => {
          return (
            <div key={id} className='container mx-auto py-4 px-2'>
              <p><span className='QAheader'>A: </span>{answers[id].body}</p>
              <Photos photos={answers[id].photos} custom={true} />
              <div className='px-4'>
                <QaStatus data={{reviewer_name: answers[id].answerer_name, date: answers[id].date, helpfulCount: answers[id].helpfulness}}
                clickedAnswerId={clickedAnswerId}
                reported={reported}
                index={idx}
                handleHelpfulClick={(e) => handleAnswerHelpfulClick(e, id)}
                 handleReportClick={(e) => handleAnswerReportClick(e, id)}
                 messageType='answer'/>
                 {(reported && clickedAnswerId === id) ? <small>Reported ✓</small> : null}
              </div>
            </div>
          );
        })}
        </h4>}
        {(answerId.length > 2) ? <LoadMoreAnswers handleLoadMoreAnswers={handleLoadMoreAnswers} clickedQuestionIndex={clickedQuestionIndex} index={index} loadMore={loadMore} /> : null}
    </div>
    </div>
  );
};

export default Answer;