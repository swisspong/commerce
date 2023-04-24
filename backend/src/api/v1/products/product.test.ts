import request from "supertest"
import { app } from "../../../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
describe("Products TEST", () => {
  // beforeEach(async () => {
  //   // jest.setTimeout(60000);
  //   // for (let table of tableList){
  //   //   await prisma[table.table_name].deleteMany({})
  //   // }
  //   try {
      
  //     await prisma.option.deleteMany({})
  //     await prisma.variantGroup.deleteMany({})
  //     await prisma.category.deleteMany({})
  //     await prisma.product.deleteMany({})
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log("delete all table")
  //   // await Promise.all(tableList.map(async (table: { table_name: string }) => {
  
  //   //   return prisma[table.table_name].deleteMany({})
  //   // }))
  // });
  describe("POST /api/v1/products", () => {


    it('returns a 400 with an invalid prdouct name', async () => {
      return request(app)
        .post('/api/v1/products')
        .send({
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(400);
    });

    it('returns a 201 with on successful to create product', async () => {
      return request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);

    });

  })
  describe("GET /api/v1/products", () => {

    it('response with details about the products', async () => {
      await request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);
      return request(app)
        .get('/api/v1/products')
        .expect(200);
    });
  })
  describe("PUT /api/v1/products/:prod_id", () => {

    it('returns a 200 with on successful to update product', async () => {

      await request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);
      // console.log(response.body)

      return request(app)
        .put("/api/v1/products/" + response.body[0].id)
        .send({
          categories: [],
          name: "product update",
          price: 50,
          description: "new update oh god oh god!!!",
          available_stock: 50
        })
        .expect(200);

    });
  })
  describe("DELETE /api/v1/products/:prod_id", () => {

    it('returns a 200 with on successful to delete product', async () => {

      await request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);
      // console.log(response.body)

      return request(app)
        .delete("/api/v1/products/" + response.body[0].id)
        .expect(200);

    });
    it('returns a 400 with an invalid product id', async () => {

      await request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product test",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);
      // console.log(response.body)

      return request(app)
        .delete("/api/v1/products/" + response.body[0].id+"fdsfs")
        .expect(400);

    });
  })

})
