import { getClassStudents, newLesson } from 'services/index.js';


const LOADING_STUDENTS = 'mira/schoolclass/LOADING_STUDENTS';
const LOADED_STUDENTS = 'mira/schoolclass/LOADED_STUDENTS';

const UPDATE_STUDENT = 'mira/schoolclass/UPDATE_STUDENT';

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
        students: []
      }
    case LOADED_STUDENTS:
      return {
        ...state,
        loadingStudents: false,
        students: action.payload
      }
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => {
          if(student.studentId === action.payload) {
            student.status = (student.status === 'ABSENCE') ? 'PRESENT' : 'ABSENCE'
          }
          return student;
        })
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
          payload: response.data.map(student => {
            return {
              studentId: student.id,
              name: student.name,
              schoolClassId: student.schoolClassId,
              number: student.number,
              status: 'PRESENT'
            }
          })
        })
      })
      .catch(error => console.log(error))
  }
}

export function saveLesson(schoolClassId, attendance) {
  return dispatch => {
    newLesson(schoolClassId, attendance)
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error.response);
      })
  }
}

export function updateStudent(id) {
  return dispatch => {
    dispatch({
      type: UPDATE_STUDENT,
      payload: id
    })
  }
}
