import { combineReducers } from 'redux';
import teacher from '_redux/modules/teacher';
import schoolClass from '_redux/modules/school-class';
const rootReducer = combineReducers({
  teacher,
  schoolClass
});

export default rootReducer

