import React from 'react'
import { Input, Table } from 'rsuite'
import { CartItems, Item } from '../types'

interface Props {
  cartItems: CartItems,
  onItemChange: (i: Item, val: number) => void
}

export default function CartPage(props: Props) {
  return (
    <div>
      <Table
        data={Object.values(props.cartItems)}
        style={{ width: '100%' }}
        rowHeight={60}
      >
        <Table.Column flexGrow={4}>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.Cell dataKey='item.name' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Unit price</Table.HeaderCell>
          <Table.Cell dataKey='item.price' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Count</Table.HeaderCell>
          <Table.Cell>
            {
              (i: any) => {
                return (
                  <Input type='number' value={i.count}
                    onChange={(val, _e) => {
                      props.onItemChange(i.item, Number(val));
                    }}
                  />
                )
              }
            }
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.Cell >
            {(i: any) => i.count * i.item.price}
          </Table.Cell>
        </Table.Column>
      </Table>
    </div>
  )
}
