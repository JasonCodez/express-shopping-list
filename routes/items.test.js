process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');

let candy = { name: "candy",  price: 1.99};

beforeEach(function() {
   items.push(candy);
});

afterEach(function() {
   items.length = 0;
})

describe("GET /items", () => {
   test("get all items", async () => {
      const res = await request(app).get('/items');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(items);
   })
   test("get single item by name", async () => {
      const res = await request(app).get(`/items/${candy.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(candy);
   })
})

describe("POST /items", () => {
   test("Creates a new item", async () => {
      const res = await request(app).post('/items').send({ name: "oreos", price: 2.99 });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({added: { name: "oreos", price: 2.99 }});
   })
})

describe("PATCH /items/:name", () => {
   test("Updates an item", async () => {
      const res = await request(app).patch(`/items/${candy.name}`).send({name: "soda"});
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({updated: { name: "soda", price: 1.99 }});
   })
})

describe("DELETE /items/:name", () => {
   test("Deletes an item by name", async () => {
      const res = await request(app).delete(`/items/${candy.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Deleted" })
   })
})

