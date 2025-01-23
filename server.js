// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 模拟数据
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// 提供一个 API 接口用于获取用户列表
app.get('/api/users', (req, res) => {
  res.json(users);
});

// 提供一个 API 接口用于添加用户
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;