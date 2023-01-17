import { combineReducers } from 'redux';

const dummy = () => '';

const initialState = {
  data: [],
  // detail: {},
  editData: {},
  tourData: [],
  editPackage: {},
  reviewData: [],
  editReview: {},
  syllabusData: [],
  editSyllabus: {},
  loginData: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POST':
      return { ...state, data: action.payload };
    case 'GET_DATA':
      return { ...state, tourData: action.payload };
    case 'EDIT_DATA':
      return {
        ...state,
        editData: action.payload,
      };
    case 'EDIT_PACKAGE':
      return { ...state, editPackage: action.payload };

    case 'GET_REVIEW':
      return { ...state, reviewData: action.payload };
    case 'REVIEW_DATA':
      return { ...state, editReview: action.payload };
    case 'GET_SYLLABUS':
      return { ...state, syllabusData: action.payload };
    case 'EDIT_SYLLABUS':
      return { ...state, editSyllabus: action.payload };
    case 'LOGIN':
      return { ...state, loginData: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ dummy, postReducer });
