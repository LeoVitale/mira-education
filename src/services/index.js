import axios from 'axios';

//const ROOT_URL = 'http://api-test.miraeducacao.com.br';
const ROOT_URL = 'http://localhost:3005';

//##### GET http://api-test.miraeducacao.com.br/teacher/{teacherId}
export const getTeacher = (teacherId) => {
  return axios.get(`${ROOT_URL}/teacher/${teacherId}`);
}

//##### GET http://api-test.miraeducacao.com.br/teacher/{teacherId}/schoolclasses
export const getSchoolClasses = (teacherId) => {
  return axios.get(`${ROOT_URL}/teacher/${teacherId}/schoolclasses`);
}

//##### GET 	http://api-test.miraeducacao.com.br/students?schoolClassId={schoolClassId}
export const getClassStudents = (schoolClassId) => {
  return axios.get(`${ROOT_URL}/students?schoolClassId=${schoolClassId}`);
}

//##### GET 	http://api-test.miraeducacao.com.br/schoolclass/{schoolClassId}/lessons
export const getLessons = (schoolClassId) => {
  return axios.get(`${ROOT_URL}/schoolclass/${schoolClassId}/lessons`);
}

//##### POST 	http://api-test.miraeducacao.com.br/schoolclass/{schoolClassId}/lesson
export const newLesson = (schoolClassId, lesson) => {
  return axios.post(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson`, {lesson});
}

//##### PUT 	http://api-test.miraeducacao.com.br/schoolclass/{schoolClassId}/lesson/{lessonId}
export const updateLesson = (schoolClassId, lessonId) => {
  return axios.put(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson/${lessonId}`);
}

//##### DELETE	http://api-test.miraeducacao.com.br/schoolclass/{schoolClassId}/lesson/{lessonId}
export const deleteLessons = (schoolClassId, lessonId) => {
  return axios.delete(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson/${lessonId}`);
}
