const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

beforeAll(async () => {
  await db.seed.run(); //resets the seeds
});

afterAll(async () => {
  await db.destroy();
});

test("create a user", async () => {
  const res = await supertest(server)
    .post("/api/auth/register") //testing the register api
    .send({ username: "tim", password: "tim" }); //sending username and passowrd to api
  expect(res.status).toBe(201); //expects the status code to be 201
  expect(res.type).toBe("application/json"); //expects what to be sent is json
  expect(res.body.username).toBe("tim"); //expects the username
});

test("login a user", async () => {
  const res = await supertest(server)
    .post("/api/auth/login") //testing the api login
    .send({ username: "tim", password: "tim" }); //login in user
  expect(res.status).toBe(200); //expects to return 200 status
  expect(res.type).toBe("application/json");
  expect(res.body.message).toBe("Welcome tim");
});

test("jokes api not working", async () => {
  const res = await supertest(server).get("/api/jokes"); //testing the api
  expect(res.status).toBe(401); //expects to return 4011status
});

test("jokes to send json type", async () => {
  const res = await supertest(server).get("/api/jokes");
  expect(res.type).toMatch("json");
});
