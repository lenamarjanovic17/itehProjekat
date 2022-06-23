import axios from 'axios';
import React, { useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Pagination, Table } from 'rsuite'
import useGet from '../../hooks/useGet';
import { Item, ItemGroup, ItemsRes } from '../../types';
import { transformGroups } from '../../util';
import ItemForm from './ItemForm';
const pageSizeOptions = [10, 20, 30, 50]
const layout = ["total", "-", "limit", "pager"] as any;

export default function ItemsPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useGet<ItemGroup[]>('/admin/item-group', []);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [items, setItems] = useGet<ItemsRes>('/item', { data: [], total: 0 }, {
    page,
    size
  });
  const transformedGroups = transformGroups(groups)
  const selectedItem = items?.data.find(e => e.id === selectedItemId);
  const refetch = async () => {
    const res = await axios.get(`/item?size=${size}&page=${page}`);
    setItems(res.data);
  }
  const deleteItem = async (id: number) => {
    await axios.delete('/item/' + id);
    refetch();
  }

  return (
    <div className='app-container'>
      <ItemForm
        itemGroups={transformedGroups}
        open={openModal}
        onClose={() => {
          setSelectedItemId(0);
          setOpenModal(false)
        }}
        item={selectedItem}
        onSubmit={async val => {
          if (!selectedItem) {
            await axios.post('/item', val)
          } else {
            await axios.patch('/item/' + selectedItemId, val)
          }
          setSelectedItemId(0);
          refetch();
        }}
      />
      <h1 className='text-center' >Items</h1>
      <div >
        <Button appearance='primary' onClick={() => setOpenModal(true)} >Create</Button>
      </div>
      <Table
        rowHeight={60}
        autoHeight
        data={items?.data || []}
        style={{ width: '100%' }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey='id' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey='name' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.Cell dataKey='price' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Item group</Table.HeaderCell>
          <Table.Cell dataKey='itemGroup.name' />
        </Table.Column>
        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.Cell>
            {
              (item, _index) => {
                if (!item) {
                  return null;
                }
                return (
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setOpenModal(true);
                        }}
                        appearance='primary'>Update</Button>
                      <Button
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                        style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                )
              }
            }
          </Table.Cell>
        </Table.Column>
      </Table>
      <Pagination
        next
        first
        last
        activePage={page + 1}
        onChangePage={(page) => {
          setPage(page - 1);
        }}
        size="xs"
        layout={layout}
        total={items.total}
        maxButtons={5}
        ellipsis
        limitOptions={pageSizeOptions}
        limit={size}
        onChangeLimit={setSize}
      />
    </div>
  )
}
