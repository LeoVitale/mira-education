import { getClassStudents } from 'services/index.js';


const LOADING_STUDENTS = 'mira/schoolclass/LOADING_STUDENTS';
const LOADED_STUDENTS = 'mira/schoolclass/LOADED_STUDENTS';

const SET_CLASS = 'mira/schoolclass/SET_CLASS';


const initialState = {
  classSession: {},
  students: [],
  loadingStudents: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CLASS:
      return {
        ...state,
        classSession: action.payload
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

export function setSchoolClass(classSession) {
  return dispatch => {
    dispatch({
      type: SET_CLASS,
      payload: classSession
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
