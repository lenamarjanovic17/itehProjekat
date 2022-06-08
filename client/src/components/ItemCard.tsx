import React from 'react'
import { Item } from '../types'

interface Props {
  item: Item
}

export default function ItemCard(props: Props) {
  return (
    <div className='item-card'>
      <img src={props.item.imageUrl} alt={props.item.name} width='100%' height='350' />
      <div>
        <h2>{props.item.name}</h2>
        <h3>{props.item.price} RSD</h3>
        <p>{props.item.description}</p>
      </div>
    </div>
  )
}
