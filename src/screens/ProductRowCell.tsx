import React, {useState} from 'react'
import type {FC} from 'react'
// prettier-ignore
import {View, Text, TextInput, TouchableView as TouchableView,
MaterialCommunityIcon as Icon} from '../theme/navigation'
import * as D from '../data'
import {styles} from './ProductRowCell.style'

export type ProductRowCellProps = {
  product: D.IProduct
  onDeletePressed: () => void
}

const ProductRowCell: FC<ProductRowCellProps> = ({
  product: initialProduct,
  onDeletePressed,
}) => {
  const [product, setProduct] = useState<D.IProduct>(initialProduct)
  return (
    <View style={[styles.view]}>
      <View
        style={[
          styles.firstRowView,
          {
            backgroundColor: 'rgba(99, 255, 99, 1.0)',
          },
        ]}>
        <TextInput
          style={[
            styles.name,
            {
              color: 'rgba(99, 99, 99, 1.0)',
            },
          ]}>
          {product.name}
        </TextInput>
        <TextInput style={[styles.category]}>{product.category}</TextInput>
        <TextInput style={[styles.price]}>{product.price}</TextInput>
      </View>
      <View
        style={[
          styles.secondRowView,
          {
            backgroundColor: 'rgba(99, 255, 99, 1.0)',
          },
        ]}>
        <TextInput
          style={[
            styles.quantity,
            {
              color: 'rgba(99, 99, 99, 1.0)',
            },
          ]}>
          {product.quantity}
        </TextInput>
        <TextInput style={[styles.productId]}>{product.productId}</TextInput>
        <TextInput style={[styles.optionCodeName]}>
          {product.optionCodeName}
        </TextInput>
        <TouchableView style={[styles.touchableView]} onPress={onDeletePressed}>
          <Text style={[styles.text]}>- 제거</Text>
        </TouchableView>
      </View>
    </View>
  )
}
export default ProductRowCell
