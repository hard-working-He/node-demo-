// server.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 引入被测试的 server 模块
const server = require('./server');

const app = express();
app.use(cors());
app.use(bodyParser.json());


describe('User API', () => {
  // 测试 GET /api/users 接口
  test('GET /api/users should return a list of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Alice');
    expect(response.body[1].name).toBe('Bob');
  });

  // 测试 POST /api/users 接口
  test('POST /api/users should add a new user', async () => {
    const newUser = { name: 'Charlie' };
    const response = await request(server)
  .post('/api/users')
  .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Charlie');
    // 由于服务器是独立运行的，我们不能直接访问服务器端的 users 数组，需要再次请求来验证
    const usersResponse = await request(server).get('/api/users');
    expect(usersResponse.body).toHaveLength(3);
    expect(usersResponse.body[2].name).toBe('Charlie');
  });
});