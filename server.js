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

app.get('/schoolclass/:schollClassId/lessons', (req, res) => {
  const schollClassId = req.params.schollClassId;
  axios.get(`${ROOT_URL}/schoolclass/${schollClassId}/lessons`)
    .then(response => {
      res.send(response.data);
    });
})

app.post('/schoolclass/:schollClassId/lesson', (req, res, next) => {
  const schollClassId = req.params.schollClassId;
  const lesson = req.body.lesson;

  axios.post(`${ROOT_URL}/schoolclass/${schollClassId}/lesson`, lesson)
    .then(response => {
      res.status(200).send(CircularJSON.stringify(response));
      next();
    }).catch(error => {
      res.status(error.response.status).send(error.response.data);
      next();
    });;
})

app.put('/schoolclass/:schoolClassId/lesson/:lessonId', (req, res) => {
  const schollClassId = req.params.schollClassId;
  const lessonId = req.params.lessonId;
  axios.put(`${ROOT_URL}/schoolclass/${schoolClassId}/lesson/${lessonId}`)
    .then(response => {
      res.send(response.data);
    })
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
