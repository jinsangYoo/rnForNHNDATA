import type {IProduct} from './IProduct'
import * as F from './faker'
import * as U from './util'

export const createRandomProduct = (): IProduct => {
  const name = F.randomProduct()
  return {
    id: F.randomId(),
    name,
    category: F.randomDepartment(),
    price: F.randomPrice(),
    quantity: U.random(1, 100),
    productId: F.randomWord(),
    optionCodeName: F.randomProductMaterial(),
  }
}
