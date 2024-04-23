const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const secretKey = 'mySecretKey';

const users = [
  { id: 1, username: 'a', password: 'a' },
  { id: 2, username: 'b', password: 'b' }
];
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true, withCredentials: true, 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin' : '*'}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '7d' });
  
  res.cookie("token", token, { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ success: true });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ success: true });
});


const verifyToken = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      req.userId = decoded.userId; 
      next();
    });
};

app.get('/private', verifyToken, (req, res) => {
    res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Authentication server listening at http://localhost:${port}`);
});
