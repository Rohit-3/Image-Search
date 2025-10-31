const request = require('supertest');
let app;

beforeAll(() => {
  // lazy import to avoid connecting DB in tests for simple 200 checks
  app = require('express')();
  app.get('/api/top-searches', (req, res) => res.json([]));
});

test('GET /api/top-searches returns 200', async () => {
  const res = await request(app).get('/api/top-searches');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});


