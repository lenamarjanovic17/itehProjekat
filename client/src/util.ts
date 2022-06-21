import { ItemGroup } from "./types";


export function transformGroups(groups: ItemGroup[]) {
  const getName = (group?: ItemGroup): string => {
    if (!group?.parentGroup) {
      return group?.name || '';
    }
    const parent = groups.find(e => e.id === group.parentGroup);
    return getName(parent) + ' - ' + group.name;
  }
  return groups.map(element => {
    return {
      ...element,
      name: getName(element)
    }
  })
}