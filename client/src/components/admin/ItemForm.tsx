import React, { useEffect, useState } from 'react'
import { Form, Modal, Input, Button, InputPicker, Uploader } from 'rsuite'
import { Item, ItemGroup, Specification } from '../../types'
import SpecificationTable from '../SpecificationTable';
import ImageIcon from '@rsuite/icons/Image';
interface Props {
  item?: Item,
  open: boolean,
  onClose: () => void,
  onSubmit: (item: Partial<Item>) => Promise<void>,
  itemGroups: ItemGroup[]
}
//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


export default function ItemForm(props: Props) {
  const [specification, setSpecification] = useState<Specification>({})
  const [formState, setFormState] = useState<Partial<Item>>({});
  useEffect(() => {
    if (!props.open) {
      return;
    }
    if (!props.item) {
      setSpecification({});
      setFormState({});
      return;
    }
    const { specification, ...rest } = props.item
    setFormState(rest);
    setSpecification(specification);
  }, [props.open, props.item])
  return (
    <Modal
      size='lg'
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          <h3 className='text-center'>
            Item form
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name='name' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Price</Form.ControlLabel>
              <Form.Control name='price' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Group</Form.ControlLabel>
              <Form.Control name='groupId' className='fluid' accepter={InputPicker} data={props.itemGroups.map(element => {
                return {
                  value: element.id,
                  label: element.name
                }
              })} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control name='note' accepter={Textarea} />
            </Form.Group>
            <Button type='submit' appearance='primary'>{
              props.item ? 'Update' : 'Create'
            }</Button>
          </Form>
        </div>
        <div style={{ flex: 1, paddingLeft: "10px", paddingRight: "10px" }}>
          <SpecificationTable
            specification={specification}
          />
        </div>
        <div style={{ flex: 1, paddingLeft: "20px", }}>
          <Uploader className='fluid' multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
            <div
              style={{
                backgroundImage: `url(${props.item?.imageUrl || ''})`,
                backgroundSize: 'cover',
                height: '300px'
              }}
            >
              {
                !props.item?.imageUrl && (
                  <ImageIcon />
                )
              }
            </div>
          </Uploader>
        </div>
      </Modal.Body>
    </Modal>
  )
}
