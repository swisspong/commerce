import request from "supertest"
import { app } from "../../../../app";

describe("Variants TEST", () => {
    describe("POST /api/v1/products/:prod_id/variants", () => {

        it('returns a 201 with on successful to create variant', async () => {
            const created = await request(app)
                .post('/api/v1/products')
                .send({
                    categories: [],
                    name: "product testd",
                    price: 10,
                    description: "oh god oh god!!!",
                    available_stock: 10
                })
                .expect(201);

            await request(app)
                .put('/api/v1/products/' + created.body.id + "/variant_groups")
                .send({
                    variant_groups: [
                        {
                            name: "color",
                            options: [
                                {
                                    name: "red"
                                },
                                {
                                    name: "blue"
                                }
                            ]
                        },
                        {
                            name: "size",
                            options: [
                                {
                                    name: "s"
                                },
                                {
                                    name: "m"
                                }
                            ]
                        },
                    ]
                })
                .expect(200);

            const result = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variant_groups")
                .expect(200);

            // console.log(result.body)
            const options = result.body.map((item: any) => ({ [item.id]: item.Option[0].id }))
            // console.log(options)
            return request(app)
                .post('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    price: 0,
                    description: "",
                    quantity: 0,
                    sku: "",
                    options: options
                })
                .expect(201);
            // console.log(res)
        });

    })
    describe("GET /api/v1/products/:prod_id/variants", () => {

        it('response with details about the variants', async () => {
            const created = await request(app)
                .post('/api/v1/products')
                .send({
                    categories: [],
                    name: "product testdj",
                    price: 10,
                    description: "oh god oh god!!!",
                    available_stock: 10
                })
                .expect(201);

            await request(app)
                .put('/api/v1/products/' + created.body.id + "/variant_groups")
                .send({
                    variant_groups: [
                        {
                            name: "color",
                            options: [
                                {
                                    name: "red"
                                },
                                {
                                    name: "blue"
                                }
                            ]
                        },
                        {
                            name: "size",
                            options: [
                                {
                                    name: "s"
                                },
                                {
                                    name: "m"
                                }
                            ]
                        },
                    ]
                })
                .expect(200);

            const result = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variant_groups")
                .expect(200);

            // console.log(result.body)
            const options = result.body.map((item: any) => ({ [item.id]: item.Option[0].id }))
            // console.log(options)
            await request(app)
                .post('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    price: 0,
                    description: "",
                    quantity: 0,
                    sku: "",
                    options: options
                })
                .expect(201);
            return request(app)
                .get('/api/v1/products/' + created.body.id + "/variants")
                .expect(200);


        });
    })
    describe("DELETE /api/v1/products/:prod_id/variants", () => {

        it('returns a 200 with on successful to delete many variants', async () => {
            const created = await request(app)
                .post('/api/v1/products')
                .send({
                    categories: [],
                    name: "product testdj",
                    price: 10,
                    description: "oh god oh god!!!",
                    available_stock: 10
                })
                .expect(201);

            await request(app)
                .put('/api/v1/products/' + created.body.id + "/variant_groups")
                .send({
                    variant_groups: [
                        {
                            name: "color",
                            options: [
                                {
                                    name: "red"
                                },
                                {
                                    name: "blue"
                                }
                            ]
                        },
                        {
                            name: "size",
                            options: [
                                {
                                    name: "s"
                                },
                                {
                                    name: "m"
                                }
                            ]
                        },
                    ]
                })
                .expect(200);

            const result = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variant_groups")
                .expect(200);

            // console.log(result.body)
            const options = result.body.map((item: any) => ({ [item.id]: item.Option[0].id }))
            // console.log(options)
            await request(app)
                .post('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    price: 0,
                    description: "",
                    quantity: 0,
                    sku: "",
                    options: options
                })
                .expect(201);
            const variants = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variants")
                .expect(200);
            return request(app)
                .delete('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    variants: variants.body.map((item: any) => item.id)
                })
                .expect(200);


        });
    })
    describe("PUT /api/v1/products/:prod_id/variants", () => {
        it('returns a 200 with on successful to update many variants', async () => {
            const created = await request(app)
                .post('/api/v1/products')
                .send({
                    categories: [],
                    name: "product testdj",
                    price: 10,
                    description: "oh god oh god!!!",
                    available_stock: 10
                })
                .expect(201);

            await request(app)
                .put('/api/v1/products/' + created.body.id + "/variant_groups")
                .send({
                    variant_groups: [
                        {
                            name: "color",
                            options: [
                                {
                                    name: "red"
                                },
                                {
                                    name: "blue"
                                }
                            ]
                        },
                        {
                            name: "size",
                            options: [
                                {
                                    name: "s"
                                },
                                {
                                    name: "m"
                                }
                            ]
                        },
                    ]
                })
                .expect(200);

            const result = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variant_groups")
                .expect(200);

            // console.log(result.body)
            const options = result.body.map((item: any) => ({ [item.id]: item.Option[0].id }))
            // console.log(options)
            await request(app)
                .post('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    price: 0,
                    description: "",
                    quantity: 0,
                    sku: "",
                    options: options
                })
                .expect(201);
            const variants = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variants")
                .expect(200);
            // console.log("before up")
            // console.log(variants.body)
            // const options = result.body.map((item: any) => ({ [item.id]: item.Option[0].id }))
            const updateData = variants.body.map((item: any) => ({
                id: item.id,
                price: Number(item.price),
                description: item.description,
                quantity: item.inventory,
                sku: item.sku,
                options: result.body.map((item: any) => ({ [item.id]: item.Option[1].id }))
            }))
            const afterUp = await request(app)
                .put('/api/v1/products/' + created.body.id + "/variants")
                .send({
                    variants: updateData
                })
                .expect(200);
            // console.log("after up")
            // console.log(updateData)
            // console.log(JSON.stringify(updateData, null, 2));
            // console.log(JSON.stringify(afterUp.body, null, 2));
            // console.log(afterUp)
            // console.log(afterUp.body)
            return afterUp

        });
    })
})
