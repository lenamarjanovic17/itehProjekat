import axios from 'axios';
import React, { useState } from 'react'
import { Button, IconButton, Table } from 'rsuite';
import useGet from '../../hooks/useGet'
import { Item, ItemGroup } from '../../types'
import ItemGroupForm from './ItemGroupForm';
import TrashIcon from '@rsuite/icons/Trash';
import { transformGroups } from '../../util';
export default function ItemGroupPage() {
  const [groups, setGroups] = useGet<ItemGroup[]>('/admin/item-group', []);
  const [openModal, setOpenModal] = useState(false);
  const transformedGroups = transformGroups(groups)
  return (
    <div className='app-container'>
      <ItemGroupForm
        groups={transformedGroups}
        onClose={() => setOpenModal(false)}
        open={openModal}
        onSubmit={async val => {
          const res = await axios.post('/item-group', {
            ...val,
            children: [],
            parentGroup: groups.find(e => e.id === val.parentGroup) || null
          });
          setGroups(prev => [...prev, {
            ...res.data,
            parentGroup: res.data.parentGroup.id
          }]);
        }}
      />
      <h1 className='text-center' >Item groups</h1>
      <div >
        <Button appearance='primary' onClick={() => setOpenModal(true)} >Create</Button>
      </div>
      <div>
        <Table
          rowHeight={60}
          autoHeight
          data={transformedGroups}
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
            <Table.HeaderCell>Parent group</Table.HeaderCell>
            <Table.Cell>
              {
                (g, _i) => {
                  //@ts-ignore
                  const parent = transformedGroups.find(e => e.id === g.parentGroup);
                  if (!parent) {
                    return '/'
                  }
                  return parent.name;
                }
              }
            </Table.Cell>
          </Table.Column>
          <Table.Column>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.Cell>
              {
                (g, _i) => {
                  if (!g) {
                    return null;
                  }
                  return (
                    <IconButton
                      onClick={async () => {
                        //@ts-ignore
                        await axios.delete('/item-group/' + g.id);

                        const res = await axios.get('/admin/item-group');
                        setGroups(res.data);
                      }}
                      icon={<TrashIcon />} />
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
