import { Table } from "rsuite"
import { Specification } from "../types"
import React from 'react'
interface TableProps {
  specification: Specification
}

export default function SpecificationTable(props: TableProps) {
  return (
    <Table
      cellBordered
      bordered
      autoHeight
      rowHeight={60}
      data={Object.keys(props.specification).map(key => ({ name: key, value: props.specification[key] }))}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Specification</Table.HeaderCell>
        <Table.Cell dataKey='name' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Value</Table.HeaderCell>
        <Table.Cell dataKey='value' />
      </Table.Column>
    </Table>
  )
}
