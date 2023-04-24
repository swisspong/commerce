import request from "supertest"
import { app } from "../../../../app";

describe("Variant groups TEST", () => {
  describe("PUT /api/v1/products/:prod_id/variant_groups", () => {
    it('returns a 400 with an invalid variant groups and options', async () => {
      const created = await request(app)
        .post('/api/v1/products')
        .send({
          categories: [],
          name: "product testds",
          price: 10,
          description: "oh god oh god!!!",
          available_stock: 10
        })
        .expect(201);

      return request(app)
        .put('/api/v1/products/' + created.body.id + "/variant_groups")
        .send({
          variant_groups: [
            {
              ame: "color",
              options: [
                {
                  name: "red"
                }, {
                  name: "blue"
                }
              ]
            }
          ]

        })
        .expect(400);


    });
    it('returns a 200 with on successful to create variant groups and options', async () => {
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

      return request(app)
        .put('/api/v1/products/' + created.body.id + "/variant_groups")
        .send({
          variant_groups: [
            {
              name: "color",
              options: [
                {
                  name: "red"
                }, {
                  name: "blue"
                }
              ]
            }
          ]
        })
        .expect(200);


    });
    it('returns a 200 with on successful to update variant groups and options', async () => {
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
                },
                {
                  name: "green"
                }
              ]
            },
            {
              name: "size",
              options: [
                {
                  name: "S"
                },
                {
                  name: "M"
                },
                {
                  name: "L"
                }
              ]
            }
          ]

        })
        .expect(200);

      const response = await request(app)
        .get('/api/v1/products/' + created.body.id + "/variant_groups")
        .expect(200);

      // console.log(response.body[0].id)
      await request(app)
        .put('/api/v1/products/' + created.body.id + "/variant_groups")
        .send({
          variant_groups: [
            {
              id: response.body[0].id,
              name: "buttons",
              options: [
                {
                  name: "redf"
                },
                {
                  name: "bluef"
                },
                {
                  name: "greenf"
                }
              ]
            },
            {
              name: "type",
              options: [
                {
                  name: "redff"
                },
                {
                  name: "blueff"
                },
                {
                  name: "greenff"
                }
              ]
            }
          ]

        })
        .expect(200);
      const result = await request(app)
        .get('/api/v1/products/' + created.body.id + "/variant_groups")
        .expect(200);
      expect(result.body.length).toBe(2)
    });
  })
  describe("GET /api/v1/products/:prod_id/variant_groups", () => {

    it('response with details about the variant groups', async () => {
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
                }, {
                  name: "blue"
                }
              ]
            }
          ]

        })
        .expect(200);

      return request(app)
        .get('/api/v1/products/' + created.body.id + "/variant_groups")
        .expect(200);

    });
  })
})
