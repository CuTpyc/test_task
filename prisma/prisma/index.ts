import { PrismaClient } from '@prisma/client';
import {
  countAllProducts,
  countAllProductsOnStock,
  countProduct,
  countProductByCategory,
  countProductOnStock,
  countProductOnStockByCategory,
} from './services/productService';

const prisma = new PrismaClient();

async function main () {
  const allProductCount = await countAllProducts();
  console.log('allProductCount', allProductCount)
  const productCount = await countProduct('product_0');
  console.log('countProduct for "product_0"', productCount)
  const allProductCountOnStock = await countAllProductsOnStock('stock_0');
  console.log('allProductCountOnStock for "stock_0"', allProductCountOnStock)
  const productCountOnStock = await countProductOnStock('stock_0', 'product_0');
  console.log('productCountOnStock for "stock_0" && "product_0"', productCountOnStock)
  const allProductCountByCategory = await countProductByCategory('category_0');
  console.log('allProductCountByCategory for "category_0"', allProductCountByCategory)
  const allProductCountOnStockByCategory = await countProductOnStockByCategory('stock_0', 'category_0');
  console.log('allProductCountOnStockByCategory for "stock_0" && "category_0"', allProductCountOnStockByCategory)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
