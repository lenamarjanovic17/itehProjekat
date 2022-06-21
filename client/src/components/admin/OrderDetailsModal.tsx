import React from 'react'
import { Modal, Table } from 'rsuite'
import { Order } from '../../types'

interface Props {
  order?: Order,
  open: boolean,
  onClose: () => void
}

export default function OrderDetailsModal(props: Props) {
  return (
    <Modal
      size='lg'
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>Order items</Modal.Title>
        <Modal.Body>
          <Table
            data={props.order?.orderItems || []}
            style={{ width: '100%' }}
          >
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Item id</Table.HeaderCell>
              <Table.Cell dataKey='id' />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Item name</Table.HeaderCell>
              <Table.Cell dataKey='itemName' />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Unit price</Table.HeaderCell>
              <Table.Cell dataKey='itemPrice' />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Count</Table.HeaderCell>
              <Table.Cell dataKey='count' />
            </Table.Column>
            <Table.Column flexGrow={2}>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.Cell>
                {
                  (item, index) => {
                    //@ts-ignore
                    return item.count * item.itemPrice;
                  }
                }
              </Table.Cell>
            </Table.Column>
          </Table>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}
