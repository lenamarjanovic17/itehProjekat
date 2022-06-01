import React, { useState } from 'react'
import { FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import useGet from '../hooks/useGet'
import { ItemGroup } from '../types'
import GroupFilter from './GroupFilter';

function flattenGroups(itemGroups: ItemGroup[]) {
  let arr: ItemGroup[] = [];
  for (let group of itemGroups) {
    arr.push(group);
    if (group.children.length > 0) {
      arr.push(...flattenGroups(group.children))
    }
  }
  return arr;
}

export default function ShopPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [groups] = useGet<ItemGroup[]>('/item-group', [], {
    groupId: selectedGroupId + ''
  });

  return (
    <FlexboxGrid >
      <FlexboxGridItem colspan={6}>
        <GroupFilter onSelect={setSelectedGroupId} itemGroups={groups} />
      </FlexboxGridItem>

      <FlexboxGridItem colspan={3}>
      </FlexboxGridItem>
      <FlexboxGridItem colspan={10}>
        <h2 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{flattenGroups(groups).find(e => e.id == selectedGroupId)?.name || ''}</h2>
      </FlexboxGridItem>
    </FlexboxGrid>
  )
}
