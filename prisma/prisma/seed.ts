import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stockCount = 10
const categoriesCount = 10
const productsCount = 100

const main = async () => {
  try{
    const stock = []
    for (let index = 0; index < stockCount; index++) {
      const uuid = `stock_${index}`
      stock.push(await prisma.stock.upsert({
        where: { uuid },
        update: {},
        create: {
          uuid,
          title: uuid,
        },
      }))
    }

    const categories = []
    for (let index = 0; index < categoriesCount; index++) {
      const slug = `category_${index}`
      categories.push(await prisma.category.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          title: slug,
        },
      }))
    }

    const products = []
    for (let index = 0; index < productsCount; index++) {
      const sku = `product_${index}`
      products.push(await prisma.product.upsert({
        where: { sku },
        update: {},
        create: {
          sku,
          title: sku,
        },
      }))
    }

    for (const product of products) {
      const randomCategoryId = Math.floor(Math.random() * categoriesCount)
      const randomCategory = categories.find((_, index) => {
        return index === randomCategoryId
      })
      const randomStockId = Math.floor(Math.random() * stockCount)
      const randomStock = stock.find((_, index) => {
        return index === randomStockId
      })
      if (randomCategory) {
        await prisma.productCategory.create({
          data: {
            product: {
              connect: {
                id: product?.id
              }
            },
            category: {
              connect: {
                id: randomCategory?.id
              }
            },
          },
        })
      }
      if (randomStock) {
        await prisma.productStock.create({
          data: {
            product: {
              connect: {
                id: product?.id
              }
            },
            stock: {
              connect: {
                id: randomStock?.id
              }
            },
            quantity: Math.floor(Math.random() * 100) + 1,
          },
        })
      }
    }
    console.log(`Database has been seeded. 🌱`);
  }
  catch(error){
    throw error;
  }
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
