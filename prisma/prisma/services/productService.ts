import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const countAllProducts = async () => {
  const stocks = await prisma.stock.findMany({
    include: {
      products: {
        select: {
          quantity: true
        }
      }
    }
  })

  return stocks.reduce((totalAmount, stock) => {
    return totalAmount + stock.products.reduce((productTotalAmount, product) => {
      return productTotalAmount + (product.quantity ?? 0)
    }, 0)
  }, 0) ?? 0
}


export const countAllProductsOnStock = async (uuid: string) => {
  const stock = await prisma.stock.findUnique({
    where: { uuid },
    include: {
      products: {
        select: {
          quantity: true
        }
      }
    },
  })

  return stock?.products.reduce((productTotalAmount, product) => {
    return productTotalAmount + (product.quantity ?? 0)
  }, 0) ?? 0
};

export const countProduct = async (sku: string) => {
  const products = await prisma.product.findUnique({
    where: { sku },
    include: { stock: true },
  })

  return (products?.stock ?? []).reduce((totalAmount, stock) => {
    return totalAmount + (stock.quantity ?? 0)
  }, 0) ?? 0
};

export const countProductOnStock = async (uuid: string, sku: string) => {
  const stock = await prisma.stock.findFirst({
    where: {
      uuid,
    },
    include: {
      products: {
        select: {
          quantity: true
        },
        where: {
          productId: sku
        }
      }
    }
  })

  return stock?.products?.[0]?.quantity ?? 0
};

export const countProductByCategory = async (slug: string) => {
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          category: {
            slug
          }
        }
      }
    }
  })

  return products?.length ?? 0;
};

export const countProductOnStockByCategory = async (uuid: string, slug: string) => {
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          category: {
            slug
          }
        }
      },
      stock: {
        some: {
          stock: {
            uuid
          }
        }
      },
    },
    include: {
      stock: {
        select: {
          quantity: true
        },
        where: {
          stockId: uuid
        }
      },
      categories: {
        where: {
          categoryId: slug
        }
      }
    }
  })
  return products?.reduce((totalAmount, product) => {
    return totalAmount + product?.stock?.[0]?.quantity ?? 0
  }, 0) ?? 0
};
