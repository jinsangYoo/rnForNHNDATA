import faker from 'faker'
import * as U from './util'

export const randomId = (): string => faker.datatype.uuid() // faker.random.uuid
export const randomName = (): string => faker.name.findName()
export const randomEmail = (): string => faker.internet.email()
export const randomAvatarUrl = (name?: string): string =>
  U.avatarUriByName(name ?? randomName())
export const randomDate = (): Date => faker.date.recent()
export const randomParagraphs = (count: number = 2): string =>
  U.makeArray(count).map(faker.lorem.paragraph).join('\n')
export const randomImage = (): string =>
  U.unsplashUrl(U.random(800, 1000), U.random(800, 1000))

// product
export const randomProduct = (): string => faker.commerce.product()
export const randomProductName = (): string => faker.commerce.productName()
export const randomProductAdjective = (): string =>
  faker.commerce.productAdjective()
export const randomProductMaterial = (): string =>
  faker.commerce.productMaterial()
export const randomDepartment = (): string => faker.commerce.department()
export const randomPrice = (): string => faker.commerce.price(100, 10000)

// random
export const randomWord = (): string => faker.random.word()
