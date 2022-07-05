const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const usersControllers=require('./controllers/users.controller');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// });
app.use('/users', usersControllers);
app.use(express.static('public'));

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
});