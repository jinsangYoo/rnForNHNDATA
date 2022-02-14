import React, {useState} from 'react'
import type {FC} from 'react'
// prettier-ignore
import {View, Text, TextInput, TouchableView as TouchableView} from '../theme/navigation'
import * as D from '../data'
import {styles} from './ProductRowCell.style'
import {Colors} from 'react-native-paper'

export type ProductRowCellProps = {
  product: D.IProduct
  index: number
  onDeletePressed: () => void
}

const ProductRowCell: FC<ProductRowCellProps> = ({
  product: initialProduct,
  index,
  onDeletePressed,
}) => {
  const [product, setProduct] = useState<D.IProduct>(initialProduct)
  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor:
            index % 2 == 1 ? 'rgba(99, 99, 99, 0.8)' : Colors.transparent,
        },
      ]}>
      <View style={[styles.firstRowView]}>
        <TextInput style={[styles.name]} placeholder="제품명">
          {product.name}
        </TextInput>
        <TextInput style={[styles.category]} placeholder="제품카테">
          {product.category}
        </TextInput>
        <TextInput style={[styles.price]} placeholder="제품가격">
          {product.price}
        </TextInput>
      </View>
      <View style={[styles.secondRowView]}>
        <TextInput style={[styles.quantity]} placeholder="제품수량">
          {product.quantity}
        </TextInput>
        <TextInput style={[styles.productId]} placeholder="제품ID">
          {product.productId}
        </TextInput>
        <TextInput style={[styles.optionCodeName]} placeholder="옵션코드">
          {product.optionCodeName}
        </TextInput>
        <TouchableView
          style={[
            styles.touchableView,
            {
              backgroundColor: 'rgba(255, 99, 99, 0.8)',
            },
          ]}
          onPress={onDeletePressed}>
          <Text style={[styles.text]}>제거</Text>
        </TouchableView>
      </View>
    </View>
  )
}
export default ProductRowCell
