import request from "supertest"
import { app } from "../../../app";
describe("Carts TEST", () => {

    describe("GET /api/v1/carts", () => {

        // it('returns a 400 with an invalid category name', async () => {
        //     return request(app)
        //         .post('/api/v1/categories')
        //         .send([{ name: 3 }])
        //         .expect(400);
        // });
        // it('returns a 400 with an invalid array length of category', async () => {
        //     return request(app)
        //         .post('/api/v1/categories')
        //         .send([])
        //         .expect(400);
        // });
        it('return a 200 with a valid create cart', async () => {
            return request(app)
                .get('/api/v1/carts')
                .expect(201);
        });
    })
    describe("POST /api/v1/carts/{cart_id}", () => {


        it('return a 200 with a valid add item to cart', async () => {

            const created = await request(app)
                .post('/api/v1/products')
                .send({
                    categories: [],
                    name: "product testdjj",
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
            // console.log(JSON.stringify(updateData, null, 2));
            const productVariants = await request(app)
                .get('/api/v1/products/' + created.body.id + "/variants")
                .expect(200);
            console.log(JSON.stringify(productVariants.body, null, 2));
            await request(app)
                .get('/api/v1/carts')
                .expect(201);
            await request(app)
                .post('/api/v1/carts/' + created.body.id)
                .send({
                    id: created.body.id,
                    quantity: 1,
                    variant_id: 1
                })
                .expect(201);
        });
    })

    // describe('GET /api/v1/categories', () => {

    //     it('responds with details about the categories', async () => {
    //         await request(app)
    //             .post('/api/v1/categories')
    //             .send([
    //                 { name: "Jeans" },
    //                 { name: "Pants" },
    //             ])
    //             .expect(201);
    //         const response = await request(app)
    //             .get('/api/v1/products')
    //             .expect(200);

    //         // expect(response.body).toEqual([]);
    //     });
    // })
    // describe('PUT /api/v1/categories', () => {

    //     it('returns a 400 with an invalid id of update category', async () => {
    //         await request(app)
    //             .post('/api/v1/categories')
    //             .send([
    //                 { name: "Jeans" },
    //                 { name: "Pants" },
    //                 { name: "Shoes" },
    //             ])
    //             .expect(201);

    //         const response = await request(app)
    //             .get('/api/v1/categories')
    //             .expect(200);



    //         await request(app)
    //             .put('/api/v1/categories')
    //             .send([
    //                 { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp" },
    //                 { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj" },
    //                 { id: response.body.find((item: any) => item.name === "Shoes").id + "1fadf", name: "Shoes", isDelete: true },
    //             ])
    //             .expect(400);


    //     });
    //     it('returns a 200 with a valid update category', async () => {
    //         await request(app)
    //             .post('/api/v1/categories')
    //             .send([
    //                 { name: "Jeans" },
    //                 { name: "Pants" },
    //                 { name: "Shoes" },
    //             ])
    //             .expect(201);

    //         const response = await request(app)
    //             .get('/api/v1/categories')
    //             .expect(200);



    //         await request(app)
    //             .put('/api/v1/categories')
    //             .send([
    //                 { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj" },
    //                 { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp" },
    //                 { id: response.body.find((item: any) => item.name === "Shoes").id, name: "Shoes", isDelete: true },
    //             ])
    //             .expect(200);


    //     });
    //     it('returns a 200 with a valid delete category', async () => {
    //         await request(app)
    //             .post('/api/v1/categories')
    //             .send([
    //                 { name: "Jeans" },
    //                 { name: "Pants" },
    //                 { name: "Shoes" },
    //             ])
    //             .expect(201);

    //         const response = await request(app)
    //             .get('/api/v1/categories')
    //             .expect(200);



    //         await request(app)
    //             .put('/api/v1/categories')
    //             .send([
    //                 { id: response.body.find((item: any) => item.name === "Jeans").id, name: "Jj", isDelete: true },
    //                 { id: response.body.find((item: any) => item.name === "Pants").id, name: "Pp", isDelete: true },
    //                 { id: response.body.find((item: any) => item.name === "Shoes").id, name: "Shoes", isDelete: true },
    //             ])
    //             .expect(200);


    //     });
    // })


})