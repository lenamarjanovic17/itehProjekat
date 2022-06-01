import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Sidenav } from 'rsuite'
import { ItemGroup } from '../types'


interface Props {
  itemGroups: ItemGroup[]
  onSelect: (id: number) => void
}
interface ItemProps {
  itemGroup: ItemGroup,
  onSelect: (id: number) => void
}
export default function GroupFilter(props: Props) {

  return (
    <Sidenav appearance='subtle'>
      <Sidenav.Body>
        <Nav>
          {
            props.itemGroups.map(element => {
              return (
                <GroupNavItem
                  onSelect={props.onSelect}
                  key={element.id} itemGroup={element} />
              )
            })
          }
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  )
}
function GroupNavItem(props: ItemProps) {
  if (props.itemGroup.children.length > 0) {
    return (
      <Nav.Menu eventKey={props.itemGroup.id + ''} title={<span onClick={(e) => {
        e.stopPropagation();
        props.onSelect(props.itemGroup.id || 0)
      }}>
        {props.itemGroup.name}
      </span>}>
        {
          props.itemGroup.children.map(element => {
            return (
              <GroupNavItem onSelect={props.onSelect} key={element.id} itemGroup={element} />
            )
          })
        }
      </Nav.Menu>
    )
  }
  return (
    <Nav.Item eventKey={props.itemGroup.id + ''}>
      {<span onClick={() => props.onSelect(props.itemGroup.id || 0)}>
        {props.itemGroup.name}
      </span>}
    </Nav.Item>
  )
}