import { getTeacher, getSchoolClasses, getLessons } from 'services/index.js';

const LOADING_TEACHER = 'mira/teacher/LOADING_TEACHER';
const LOADED_TEACHER = 'mira/teacher/LOADED_TEACHER';

const LOADING_CLASSES = 'mira/teacher/LOADING_CLASSES';
const LOADED_CLASSES = 'mira/teacher/LOADED_CLASSES';

const LOADING_LESSONS = 'mira/teacher/LOADING_LESSONS';
const LOADED_LESSONS = 'mira/teacher/LOADED_LESSONS';

const initialState = {
  teacher: {},
  loading: false,
  classes: [],
  loadingClasses: false,
  lessons: {},
  loadingLessons: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case LOADING_TEACHER:
      return {
        ...state,
        loading: true
      }
    case LOADED_TEACHER:
      return {
        ...state,
        loading: false,
        teacher: action.payload
      }
    case LOADING_CLASSES:
      return {
        ...state,
        loadingClasses: true,
      }
    case LOADED_CLASSES:
      return {
        ...state,
        loadingClasses: false,
        classes: action.payload
      }
    case LOADING_LESSONS:
      return {
        ...state,
        loadinLessons: true
      }
    case LOADED_LESSONS:
      return {
        ...state,
        loadinLessons: false,
        lessons: {...state.lessons, ...action.payload}
      }

    default:
      return state
  }
}

export function loadTeacher(teacherId) {
  return dispatch => {
    dispatch({
      type: LOADING_TEACHER
    })

    getTeacher(teacherId)
      .then(response => {
        dispatch({
          type: LOADED_TEACHER,
          payload: response.data
        })
        dispatch(loadClasses(response.data.id))
      })
      .catch(error => console.log(error))
  }
}

export function loadClasses(teacherId) {
  return dispatch => {
    dispatch({
      type: LOADING_CLASSES
    })

    getSchoolClasses(teacherId)
      .then(response => {
        dispatch({
          type: LOADED_CLASSES,
          payload: response.data
        })
      })
      .catch(error => console.log(error))
  }
}

export function getClassLessons(schoolClassId) {
  return dispatch => {
    dispatch({
      type: LOADING_LESSONS
    })
    getLessons(schoolClassId)
      .then(response => {
        dispatch({
          type: LOADED_LESSONS,
          payload: { [schoolClassId]: response.data }
        })
      })
  }
}

