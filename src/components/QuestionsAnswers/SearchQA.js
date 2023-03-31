import React, {useState, useEffect} from 'react';
import {MdSearch} from 'react-icons/md';
import {useSelector, useDispatch} from 'react-redux';
import questionsAnswersSlice from '../../reducers/questionsAnswersSlice.js';
import './QACss/QASearch.css';

// filter through the questions and answers section
// remember placeholder text, container for input and align left
const SearchQA = ({searchHandler}) => {

  let inputCSS = 'searchBox search-field input input-bordered w-full rounded-none h-16 mr-3 py-3 input-primary placeholder-secondary';

  return (

    <div module="clickSearchbar|QA" className=' input-container'>
      <MdSearch className='searchIcon' />
      <input onChange={searchHandler} className={inputCSS} placeholder='Have a question? Search for answers...' />
    </div>

  );
};

export default SearchQA;