import React, { useState } from 'react'
import { Button, Form, Input, Table } from 'rsuite'
import { CartItems, Item, TargetLocation } from '../types'

interface Props {
  cartItems: CartItems,
  onItemChange: (i: Item, val: number) => void,
  onSubmit: (tl: Partial<TargetLocation>) => Promise<void>
}
//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const headerStyle = { textAlign: 'center', margin: "10px 0" } as any

export default function CartPage(props: Props) {
  const [formState, setFormState] = useState<Partial<TargetLocation>>({});
  return (
    <div>
      <h1 style={headerStyle}>Your cart</h1>
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
      <h2 style={headerStyle}>Delivery info</h2>
      <Form
        formValue={formState}
        onChange={(val, e) => {
          setFormState(val);
        }}
        onSubmit={async (c, _e) => {
          if (!c) {
            return;
          }
          await props.onSubmit(formState);
          setFormState({});
        }}
        fluid
      >
        <Form.Group>
          <Form.ControlLabel>Phone</Form.ControlLabel>
          <Form.Control name='phone' />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Address</Form.ControlLabel>
          <Form.Control name='address' />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Apartment</Form.ControlLabel>
          <Form.Control name='apartment' />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Floor</Form.ControlLabel>
          <Form.Control name='floor' />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Delivery note</Form.ControlLabel>
          <Form.Control name='note' accepter={Textarea} />
        </Form.Group>
        <Button type='submit' appearance='primary' style={{ width: '100%', margin: '10px 0' }}>Order</Button>
      </Form>
    </div>
  )
}
