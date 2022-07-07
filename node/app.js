const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const usersControllers=require('./controllers/users.controller');
const meetingControllers=require('./controllers/meeting.controller');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersControllers);
app.use('/meeting', meetingControllers);
app.use(express.static('public'));

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
});