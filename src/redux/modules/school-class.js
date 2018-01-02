import { getClassStudents } from 'services/index.js';


const LOADING_STUDENTS = 'mira/schoolclass/LOADING_STUDENTS';
const LOADED_STUDENTS = 'mira/schoolclass/LOADED_STUDENTS';

const LOADING_CLASS = 'mira/schoolclass/LOADING_CLASS';
const SET_CLASS = 'mira/schoolclass/SET_CLASS';


const initialState = {
  class: {},
  loadingClass: false,
  students: [],
  loadingStudents: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case LOADING_CLASS:
      return {
        ...state,
        loadingClass: true
      }
    case SET_CLASS:
      return {
        ...state,
        loadingClass: false,
        class: action.payload
      }
    case LOADING_STUDENTS:
      return {
        ...state,
        loadingStudents: true,
      }
    case LOADED_STUDENTS:
      return {
        ...state,
        loadingStudents: false,
        students: action.payload
      }

    default:
      return state
  }
}

export function setSchoolClass(_class) {
  return dispatch => {
    dispatch({
      type: SET_CLASS,
      payload: _class
    })
  }
}

export function loadClassStudents(schoolClassId) {
  return dispatch => {
    dispatch({
      type: LOADING_STUDENTS
    })

    getClassStudents(schoolClassId)
      .then(response => {
        dispatch({
          type: LOADED_STUDENTS,
          payload: response.data
        })
      })
      .catch(error => console.log(error))
  }
}
