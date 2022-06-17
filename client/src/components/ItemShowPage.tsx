import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Table } from 'rsuite';
import useGet from '../hooks/useGet';
import { Item, Specification } from '../types';

interface Props {
  addToCart: (item: Item) => void
}

export default function ItemShowPage(props: Props) {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const [item] = useGet<Item | undefined>('/item/' + id, undefined);
  if (!id) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', paddingRight: '20px' }}>
        <img src={item?.imageUrl} width='100%' height='550' />
      </div>
      <div style={{ flex: '1', paddingLeft: '20px' }}>
        <h2>{item?.name || ''}</h2>
        <div style={{ fontSize: '18px', fontWeight: 800 }}>
          Cena: {item?.price} RSD
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800 }}>
          Grupa: {item?.itemGroup?.name}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800 }}>
          Opis
        </div>
        <p style={{ marginTop: '20px' }}>
          {item?.description}
        </p>
        <div style={{ marginTop: '20px' }}>
          {
            item?.specification && (
              <SpecTable specification={item.specification} />
            )
          }
        </div>
        <Button appearance='primary' style={{ marginTop: '20px' }} onClick={() => { props.addToCart(item!) }}>Add to cart</Button>
      </div>
    </div>
  )
}

interface TableProps {
  specification: Specification
}

function SpecTable(props: TableProps) {
  return (
    <Table
      cellBordered
      bordered
      autoHeight
      data={Object.keys(props.specification).map(key => ({ name: key, value: props.specification[key] }))}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Karakteristika</Table.HeaderCell>
        <Table.Cell dataKey='name' />
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Vrednost</Table.HeaderCell>
        <Table.Cell dataKey='value' />
      </Table.Column>
    </Table>
  )
}
