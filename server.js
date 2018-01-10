const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const CircularJSON = require('circular-json');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

const ROOT_URL = 'http://api-test.miraeducacao.com.br';

app.get('/teacher/:id', (req, res) => {
  const teacherId = req.params.id;
  axios.get(`${ROOT_URL}/teacher/${teacherId}`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/teacher/:id/schoolclasses', (req, res) => {
  const teacherId = req.params.id;
  axios.get(`${ROOT_URL}/teacher/${teacherId}/schoolclasses`)
    .then(response => {
      res.send(response.data);
    });
});

app.get('/students/', (req, res) => {
  const schoolClassId = req.query.schoolClassId;
  axios.get(`${ROOT_URL}/students?schoolClassId=${schoolClassId}`)
    .then(response => {
      res.send(response.data);
    });
})

app.post('/schoolclass/:schoolClassId/lessons', (req, res) => {
  const schoolClassId = req.params.schoolClassId;
  axios.post(`${ROOT_URL}/schoolclass/${schoolClassId}/lessons`)
    .then(response => {
      res.send(response.data);
    });
})

app.post('/schoolclass/:schoolClassId/lesson', (req, res, next) => {
  const schoolClassId = req.params.schoolClassId;
  const lesson = req.body.lesson;

  axios.post(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson`, lesson)
    .then(response => {
      res.status(200).send(CircularJSON.stringify(response));
      next();
    }).catch(error => {
      res.status(error.response.status).send(error.response.data);
      next();
    });
})

app.put('/schoolclass/:schoolClassId/lesson/:lessonId', (req, res) => {
  const schoolClassId = req.params.schoolClassId;
  const lessonId = req.params.lessonId;
  const lesson = req.body.lesson;

  axios.put(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson/${lessonId}`, lesson)
    .then(response => {
      res.send(response.data);
    }).catch(error => {
      res.status(error.response.status).send(error.response.data);
      next();
    });
})

app.delete('/schoolclass/:schoolClassId/lesson/:lessonId', () => {
  axios.delete(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson/${lessonId}`)
    .then(response => {
      res.send(response.data);
    });
})

app.listen(3005, () => {
  console.log('listening on port 3005');
});
