export function isEmpty(value: any): boolean {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  )
}

export function isStartIndexAkAtGCodeString(value: string): boolean {
  const regex = /^AK.*/
  return regex.test(value)
}

export function isAlphabetOrNumberAtStringStartIndex(value: string): boolean {
  const regex = /^[\w].*/
  return regex.test(value)
}

export function onlyAlphabetOrNumberAtStringStartIndex(value: string): string {
  if (!isEmpty(value)) {
    while (!isAlphabetOrNumberAtStringStartIndex(value)) {
      value = value.substring(1)
      if (isEmpty(value)) {
        break
      }
    }
  }
  return value
}

export function isLetterAtStringStartIndex(value: string): boolean {
  const regex = /^[\w|ㄱ-ㅎ|ㄱ-ㅎ|가-힣].*/
  return regex.test(value)
}

export function onlyLetteringAtStartIndex(value: string): string {
  if (!isEmpty(value)) {
    while (!isLetterAtStringStartIndex(value)) {
      value = value.substring(1)
      if (isEmpty(value)) {
        break
      }
    }
  }
  return value
}

export function stringToNumber(value: string, defaultValue: number): number {
  return Number(value) || defaultValue || 0
}

export function testForReg() {
  //  Alert.alert('home pressed.', 'message!!')

  console.log(`\n\n abcd: ${isAlphabetOrNumberAtStringStartIndex('abcd')}`)
  console.log(`abcd: >>${onlyAlphabetOrNumberAtStringStartIndex('abcd')}<<`)

  console.log(
    `\n\n 1234abcd: ${isAlphabetOrNumberAtStringStartIndex('1234abcd')}`,
  )
  console.log(
    `1234abcd: >>${onlyAlphabetOrNumberAtStringStartIndex('1234abcd')}<<`,
  )
  console.log(
    `\n\n 1234abcd321: ${isAlphabetOrNumberAtStringStartIndex('1234abcd321')}`,
  )
  console.log(
    `1234abcd321: >>${onlyAlphabetOrNumberAtStringStartIndex('1234abcd321')}<<`,
  )

  console.log(
    `\n\n !@#abcd: ${isAlphabetOrNumberAtStringStartIndex('!@#abcd')}`,
  )
  console.log(
    `!@#abcd: >>${onlyAlphabetOrNumberAtStringStartIndex('!@#abcd')}<<`,
  )
  console.log(
    `\n\n !@#abcd#@!: ${isAlphabetOrNumberAtStringStartIndex('!@#abcd#@!')}`,
  )
  console.log(
    `!@#abcd#@!: >>${onlyAlphabetOrNumberAtStringStartIndex('!@#abcd#@!')}<<`,
  )

  console.log(
    `\n\n //123abcd: ${isAlphabetOrNumberAtStringStartIndex('//123abcd')}`,
  )
  console.log(
    `//123abcd: >>${onlyAlphabetOrNumberAtStringStartIndex('//123abcd')}<<`,
  )
  console.log(
    `\n\n //123abcd//: ${isAlphabetOrNumberAtStringStartIndex('//123abcd//')}`,
  )
  console.log(
    `//123abcd//: >>${onlyAlphabetOrNumberAtStringStartIndex('//123abcd//')}<<`,
  )

  console.log(
    `\n\n 가나다abcd: ${isAlphabetOrNumberAtStringStartIndex('가나다abcd')}`,
  )
  console.log(
    `가나다abcd: >>${onlyAlphabetOrNumberAtStringStartIndex('가나다abcd')}<<`,
  )
  console.log(
    `\n\n 가나다abcd다나가: ${isAlphabetOrNumberAtStringStartIndex(
      '가나다abcd다나가',
    )}`,
  )
  console.log(
    `가나다abcd다나가: >>${onlyAlphabetOrNumberAtStringStartIndex(
      '가나다abcd다나가',
    )}<<`,
  )

  console.log(`\n\n ㄱabcd: ${isAlphabetOrNumberAtStringStartIndex('ㄱabcd')}`)
  console.log(`ㄱabcd: >>${onlyAlphabetOrNumberAtStringStartIndex('ㄱabcd')}<<`)
  console.log(
    `\n\n ㄱabcdㅎ: ${isAlphabetOrNumberAtStringStartIndex('ㄱabcdㅎ')}`,
  )
  console.log(
    `ㄱabcdㅎ: >>${onlyAlphabetOrNumberAtStringStartIndex('ㄱabcdㅎ')}<<`,
  )

  console.log(
    `\n\n >> $%#$abcd<<: ${isAlphabetOrNumberAtStringStartIndex(' $%#$abcd')}`,
  )
  console.log(
    `>> $%#$abcd<<: >>${onlyAlphabetOrNumberAtStringStartIndex(' $%#$abcd')}<<`,
  )
  console.log(
    `\n\n >> $%#$abcd$%#$ <<: ${isAlphabetOrNumberAtStringStartIndex(
      ' $%#$abcd$%#$ ',
    )}`,
  )
  console.log(
    `>> $%#$abcd$%#$ <<: >>${onlyAlphabetOrNumberAtStringStartIndex(
      ' $%#$abcd$%#$ ',
    )}<<`,
  )

  console.log(`\n\n >>.sde<<: ${isAlphabetOrNumberAtStringStartIndex('.sde')}`)
  console.log(`>>.sde<<: >>${onlyAlphabetOrNumberAtStringStartIndex('.sde')}<<`)
  console.log(
    `\n\n >>.sde.<<: ${isAlphabetOrNumberAtStringStartIndex('.sde.')}`,
  )
  console.log(
    `>>.sde.<<: >>${onlyAlphabetOrNumberAtStringStartIndex('.sde.')}<<`,
  )
  console.log('**************************************************************')
  console.log(`\n\n\n\n abcd: ${isLetterAtStringStartIndex('abcd')}`)
  console.log(`abcd: >>${onlyLetteringAtStartIndex('abcd')}<<`)

  console.log(`\n\n 1234abcd: ${isLetterAtStringStartIndex('1234abcd')}`)
  console.log(`1234abcd: >>${onlyLetteringAtStartIndex('1234abcd')}<<`)
  console.log(`\n\n 1234abcd321: ${isLetterAtStringStartIndex('1234abcd321')}`)
  console.log(`1234abcd321: >>${onlyLetteringAtStartIndex('1234abcd321')}<<`)

  console.log(`\n\n !@#abcd: ${isLetterAtStringStartIndex('!@#abcd')}`)
  console.log(`!@#abcd: >>${onlyLetteringAtStartIndex('!@#abcd')}<<`)
  console.log(`\n\n !@#abcd#@!: ${isLetterAtStringStartIndex('!@#abcd#@!')}`)
  console.log(`!@#abcd#@!: >>${onlyLetteringAtStartIndex('!@#abcd#@!')}<<`)

  console.log(`\n\n //123abcd: ${isLetterAtStringStartIndex('//123abcd')}`)
  console.log(`//123abcd: >>${onlyLetteringAtStartIndex('//123abcd')}<<`)
  console.log(`\n\n //123abcd//: ${isLetterAtStringStartIndex('//123abcd//')}`)
  console.log(`//123abcd//: >>${onlyLetteringAtStartIndex('//123abcd//')}<<`)

  console.log(`\n\n 가나다abcd: ${isLetterAtStringStartIndex('가나다abcd')}`)
  console.log(`가나다abcd: >>${onlyLetteringAtStartIndex('가나다abcd')}<<`)
  console.log(
    `\n\n 가나다abcd다나가: ${isLetterAtStringStartIndex('가나다abcd다나가')}`,
  )
  console.log(
    `가나다abcd다나가: >>${onlyLetteringAtStartIndex('가나다abcd다나가')}<<`,
  )

  console.log(`\n\n ㄱabcd: ${isLetterAtStringStartIndex('ㄱabcd')}`)
  console.log(`ㄱabcd: >>${onlyLetteringAtStartIndex('ㄱabcd')}<<`)
  console.log(`\n\n ㄱabcdㅎ: ${isLetterAtStringStartIndex('ㄱabcdㅎ')}`)
  console.log(`ㄱabcdㅎ: >>${onlyLetteringAtStartIndex('ㄱabcdㅎ')}<<`)

  console.log(`\n\n >> $%#$abcd<<: ${isLetterAtStringStartIndex(' $%#$abcd')}`)
  console.log(`>> $%#$abcd<<: >>${onlyLetteringAtStartIndex(' $%#$abcd')}<<`)
  console.log(
    `\n\n >> $%#$abcd$%#$ <<: ${isLetterAtStringStartIndex(' $%#$abcd$%#$ ')}`,
  )
  console.log(
    `>> $%#$abcd$%#$ <<: >>${onlyLetteringAtStartIndex(' $%#$abcd$%#$ ')}<<`,
  )

  console.log(`\n\n >>.sde<<: ${isLetterAtStringStartIndex('.sde')}`)
  console.log(`>>.sde<<: >>${onlyLetteringAtStartIndex('.sde')}<<`)
  console.log(`\n\n >>.sde.<<: ${isLetterAtStringStartIndex('.sde.')}`)
  console.log(`>>.sde.<<: >>${onlyLetteringAtStartIndex('.sde.')}<<`)
}
