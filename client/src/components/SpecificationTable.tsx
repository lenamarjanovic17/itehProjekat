import { IconButton, Input, Table } from "rsuite"
import { Specification } from "../types"
import React from 'react'
import TrashIcon from '@rsuite/icons/Trash';
interface TableProps {
  specification: Specification
}

interface ReadonlyProps {
  editing?: false
}
interface WriteProps {
  editing: true,
  onEditName: (specName: string, val: string) => void,
  onEditValue: (specName: string, val: string) => void,
  onDelete: (specName: string) => void
}
export default function SpecificationTable(props: TableProps & (ReadonlyProps | WriteProps)) {
  return (
    <Table
      cellBordered
      bordered
      height={300}
      autoHeight
      rowHeight={60}
      data={Object.keys(props.specification).map(key => ({ name: key, value: props.specification[key] }))}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Specification</Table.HeaderCell>
        {
          props.editing ? (
            <Table.Cell>
              {
                (specData: any, ind) => {
                  return (
                    <Input value={specData.name} onChange={(val) => {
                      props.onEditName(specData.name, val);
                    }} />
                  )
                }
              }
            </Table.Cell>
          ) : (
            <Table.Cell dataKey='name' />
          )
        }
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Value</Table.HeaderCell>
        {
          props.editing ? (
            <Table.Cell>
              {
                (specData: any, ind) => {
                  return (
                    <Input value={specData.value} onChange={(val) => {
                      props.onEditValue(specData.name, val);
                    }} />
                  )
                }
              }
            </Table.Cell>
          ) : (
            <Table.Cell dataKey='value' />
          )
        }
      </Table.Column>
      {
        props.editing && (
          <Table.Column>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.Cell>
              {
                (specData: any) => {
                  return (
                    <IconButton style={{ backgroundColor: 'red', color: 'white' }} icon={<TrashIcon />} onClick={() => {
                      props.onDelete(specData.name);
                    }} />
                  )
                }
              }
            </Table.Cell>
          </Table.Column>
        )
      }
    </Table>
  )
}
