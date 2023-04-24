import request from "supertest"
import { app } from "../../../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
describe("Categories TEST", () => {
   
    describe("POST /api/v1/categories", () => {

        it('returns a 400 with an invalid category name', async () => {
            return request(app)
                .post('/api/v1/categories')
                .send([{ name: 3 }])
                .expect(400);
        });
        it('returns a 400 with an invalid array length of category', async () => {
            return request(app)
                .post('/api/v1/categories')
                .send([])
                .expect(400);
        });
        it('returns a 201 with an valid create category', async () => {
            return request(app)
                .post('/api/v1/categories')
                .send([
                    { name: "Jeans" },
                    { name: "Pants" },
                ])
                .expect(201);
        });
    })
    describe('GET /api/v1/categories', () => {

        it('responds with details about the categories', async () => {
            await request(app)
                .post('/api/v1/categories')
                .send([
                    { name: "Jeans" },
                    { name: "Pants" },
                ])
                .expect(201);
            const response = await request(app)
                .get('/api/v1/products')
                .expect(200);

            // expect(response.body).toEqual([]);
        });
    })
    describe('PUT /api/v1/categories', () => {

        it('returns a 400 with an invalid id of update category', async () => {
            await request(app)
                .post('/api/v1/categories')
                .send([
                    { name: "Jeans" },
                    { name: "Pants" },
                    { name: "Shoes" },
                ])
                .expect(201);

            const response = await request(app)
                .get('/api/v1/categories')
                .expect(200);



            await request(app)
                .put('/api/v1/categories')
                .send([
                    { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp" },
                    { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj" },
                    { id: response.body.find((item: any) => item.name === "Shoes").id + "1fadf", name: "Shoes", isDelete: true },
                ])
                .expect(400);


        });
        it('returns a 200 with a valid update category', async () => {
            await request(app)
                .post('/api/v1/categories')
                .send([
                    { name: "Jeans" },
                    { name: "Pants" },
                    { name: "Shoes" },
                ])
                .expect(201);

            const response = await request(app)
                .get('/api/v1/categories')
                .expect(200);



            await request(app)
                .put('/api/v1/categories')
                .send([
                    { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj" },
                    { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp" },
                    { id: response.body.find((item: any) => item.name === "Shoes").id, name: "Shoes", isDelete: true },
                ])
                .expect(200);


        });
        it('returns a 200 with a valid delete category', async () => {
            await request(app)
                .post('/api/v1/categories')
                .send([
                    { name: "Jeans" },
                    { name: "Pants" },
                    { name: "Shoes" },
                ])
                .expect(201);

            const response = await request(app)
                .get('/api/v1/categories')
                .expect(200);



            await request(app)
                .put('/api/v1/categories')
                .send([
                    { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj", isDelete: true },
                    { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp", isDelete: true },
                    { id: response.body.find((item: any) => item.name === "Shoes").id, name: "Shoes", isDelete: true },
                ])
                .expect(200);


        });
    })


})