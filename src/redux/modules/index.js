import {
  combineReducers
} from 'redux';
import teacher from './teacher';
import schoolClass from './school-class';

export default asyncReducers =>
  combineReducers({
    teacher,
    schoolClass,
    ...asyncReducers
  });
