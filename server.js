const express    = require('express');
const faker      = require('faker');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const jwtSecret = 'dsfasf43w3f43f3f;lkv';

const user = {
  username: 'Valdemar',
  password: '12345'
};

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']})); // декодирование jwt

/* Данные о случайном юзере */
app.get('/random-user', function(req, res) {
  var user    = faker.helpers.createCard();
  user.avatar = faker.image.avatar();

  res.json(user);
});

/* Логин */
app.post('/login', authenticate, function(req, res) {
  var token = jwt.sign({
    username: user.username
  }, jwtSecret);

  res.send({
    token,
    user
  });
});

/* Получить инфу об юзере */
app.get('/me', function(req, res) {
  res.send(req.user);
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});

/* Middleware для аутентификации */
function authenticate(req, res, next) {
  var body = req.body;

  if(!body.username || !body.password) {
    res.status(400).end('Логин и пароль обязательны к заполнению');
  }

  if(body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Логин и/или пароль неверны');
  }

  next();
}