import React, { useState } from 'react'
import { Form, Modal, InputPicker, Button } from 'rsuite'
import { ItemGroup, Order } from '../../types'

interface Props {
  onSubmit: (group: Partial<ItemGroup>) => Promise<void>,
  open: boolean,
  onClose: () => void,
  groups: ItemGroup[],
}
const initial = {
  name: '',
  parentGroup: undefined,
}
export default function ItemGroupForm(props: Props) {
  const [formValue, setFormValue] = useState<Partial<ItemGroup>>(initial)
  return (
    <Modal
      size='lg'
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>Order items</Modal.Title>
        <Modal.Body>
          <Form
            fluid
            formValue={formValue}
            onChange={val => {
              setFormValue(val);
            }}
            onSubmit={async (c, e) => {

              await props.onSubmit(formValue);
              setFormValue(initial);
              props.onClose();
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name='name' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Parent group</Form.ControlLabel>
              <Form.Control name='parentGroup' className='fluid' accepter={InputPicker} data={props.groups.map(element => {
                return {
                  value: element.id,
                  label: element.name
                }
              })} />
            </Form.Group>
            <Button type='submit' appearance='primary'>Create</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}
