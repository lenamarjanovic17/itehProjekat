import axios from 'axios';
import React, { useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Table } from 'rsuite';
import useGet from '../../hooks/useGet'
import { Order } from '../../types'
import OrderDetailsModal from './OrderDetailsModal';


const orderStatusChangeMap = {
  PENDING: ['ACCEPTED', 'REJECTED'],
  REJECTED: [],
  ACCEPTED: ['DELIVERED'],
  DELIVERED: []
}

export default function OrderMonitoring() {
  const [orders, setOrders] = useGet<Order[]>('/order', []);
  const [selectedOrderId, setSelectedOrderId] = useState(0)
  const selectedOrder = orders.find(e => e.id === selectedOrderId);
  const changeStatusButton = {
    ACCEPTED: (id: number) => (
      <Button
        onClick={async () => {
          await axios.patch('/order/' + id + '/accept');
          setOrders(prev => {
            return prev.map(e => {
              if (e.id === id) {
                return {
                  ...e,
                  status: 'ACCEPTED'
                }
              }
              return e;
            })
          })
        }}
      >Accept</Button>
    ),
    REJECTED: (id: number) => (
      <Button
        onClick={async () => {
          await axios.patch('/order/' + id + '/reject');
          setOrders(prev => {
            return prev.map(e => {
              if (e.id === id) {
                return {
                  ...e,
                  status: 'REJECTED'
                }
              }
              return e;
            })
          })
        }}
      >Reject</Button>
    ),
    DELIVERED: (id: number) => (
      <Button
        onClick={async () => {
          await axios.patch('/order/' + id + '/deliver');
          setOrders(prev => {
            return prev.map(e => {
              if (e.id === id) {
                return {
                  ...e,
                  status: 'DELIVERED'
                }
              }
              return e;
            })
          })
        }}
      >Deliver</Button>
    ),
  }

  return (
    <div className='app-container' >
      <h1 className='text-center'>Order monitoring</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <OrderDetailsModal
          open={selectedOrder !== undefined}
          onClose={() => setSelectedOrderId(0)}
          order={selectedOrder}
        />
        <Table
          data={orders || []}
          rowHeight={60}
          style={{ width: '100%' }}
        >
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey='id' />
          </Table.Column>
          <Table.Column flexGrow={3}>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.Cell dataKey='user.email' />
          </Table.Column>
          <Table.Column flexGrow={3}>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.Cell dataKey='status' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.Cell dataKey='targetLocation.phone' />
          </Table.Column>
          <Table.Column flexGrow={3}>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.Cell dataKey='targetLocation.address' />
          </Table.Column>
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Apartment</Table.HeaderCell>
            <Table.Cell dataKey='targetLocation.apartment' />
          </Table.Column>
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Floor</Table.HeaderCell>
            <Table.Cell dataKey='targetLocation.floor' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.Cell dataKey='targetLocation.note' />
          </Table.Column>
          <Table.Column flexGrow={4}>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.Cell>
              {
                (order, rowIndex) => {
                  if (!order) {
                    return null;
                  }
                  console.log(order)
                  return (
                    <ButtonToolbar>
                      <ButtonGroup >
                        <Button
                          onClick={() => {
                            setSelectedOrderId(Number(order.id));
                          }}
                        >Items</Button>
                        {
                          //@ts-ignore
                          orderStatusChangeMap[order.status].map(element => {
                            //@ts-ignore
                            return changeStatusButton[element](order.id)
                          })
                        }
                      </ButtonGroup>
                    </ButtonToolbar>
                  )
                }
              }
            </Table.Cell>
          </Table.Column>
        </Table>
      </div>
    </div>
  )
}
