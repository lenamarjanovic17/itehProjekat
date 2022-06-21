import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ItemGroup } from "../entity/ItemGroup";



export async function getBaseGroups(req: Request, res: Response) {
  let groups = await AppDataSource
    .getRepository(ItemGroup)
    .find({
      loadRelationIds: {
        relations: ['parentGroup']
      }
    })
  groups.forEach(element => {
    //@ts-ignore
    element.children = groups.filter(e => e.parentGroup === element.id)
  })
  res.json(groups.filter(e => !e.parentGroup))
}

export async function getAllGroups(req: Request, res: Response) {
  let groups = await AppDataSource
    .getRepository(ItemGroup).find({
      loadRelationIds: {
        relations: ['parentGroup']
      }
    })
  res.json(groups);
}

export async function createGroup(req: Request, res: Response) {

  const group = await AppDataSource.getRepository(ItemGroup).save(req.body);

  res.json(group);
}

export async function deleteGroup(req: Request, res: Response) {
  const group = await AppDataSource.getRepository(ItemGroup).findOne({
    loadRelationIds: {
      relations: ['parentGroup', 'children']
    },
    where: {
      id: Number(req.params.id)
    }
  })
  if (!group) {
    res.sendStatus(404)
    return;
  }
  await AppDataSource.manager.transaction(async manager => {
    await manager.delete(ItemGroup, {
      id: group.id
    })
    await manager.save(ItemGroup, group.children.map(element => {
      return {
        id: element as any,
        parentGroup: {
          id: group.parentGroup as any
        }
      }
    }))
  });
  res.sendStatus(204);
}