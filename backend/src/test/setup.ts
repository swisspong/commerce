// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');

const tableList = [
  { table_name: 'cart' },
  { table_name: 'cartItem' },
  { table_name: 'category' },
  { table_name: 'option' },
  { table_name: 'order' },
  { table_name: 'orderItemReserved' },
  { table_name: 'product' },
  { table_name: 'productCategory' },
  { table_name: 'variant' },
  { table_name: 'variantGroup' },
  { table_name: 'variantSelected' }
]
const prisma = new PrismaClient();
beforeAll(async () => {
  // await Promise.all(tableList.map((table: { table_name: string }) => {
  //   return prisma[table.table_name].deleteMany({})
  // }))
  // for (let table of tableList){
  //   await prisma[table.table_name].deleteMany({})
  // }
  await prisma.$connect()
  // console.log("before all")
})

beforeEach(async () => {
  // jest.setTimeout(60000);
  // for (let table of tableList){
  //   await prisma[table.table_name].deleteMany({})
  // }
  try {

    await new Promise(resolve => setTimeout(resolve, 1000));
    await prisma.cartItem.deleteMany({})
    await prisma.cart.deleteMany({})
    await prisma.variantSelected.deleteMany({})
    await prisma.variant.deleteMany({})
    await prisma.option.deleteMany({})
    await prisma.variantGroup.deleteMany({})
    await prisma.productCategory.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.product.deleteMany({})
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.log(error)
  }
  // console.log("delete all table")
  // await Promise.all(tableList.map(async (table: { table_name: string }) => {

  //   return prisma[table.table_name].deleteMany({})
  // }))
});

afterAll(async () => {
  await prisma.$disconnect()
  // await mongo.stop();
  // await mongoose.connection.close();
});