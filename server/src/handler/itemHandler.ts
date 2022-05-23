import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";
import { ItemGroup } from "../entity/ItemGroup";

export async function getItems(req: Request, res: Response) {

  const groupId = Number(req.query.groupId);
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 20;
  const queryBuilder = AppDataSource.getRepository(Item)
    .createQueryBuilder('item')
    .innerJoinAndSelect('item.itemGroup', 'group')
  if (groupId) {

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
    const gr = groups.find(e => e.id === groupId);
    let groupIds = [gr.id];
    const getIds = (gr: ItemGroup) => {
      if (!gr) {
        return;
      }
      groupIds = [...groupIds, ...gr.children.map(e => e.id)];
      for (let g of gr.children) {
        getIds(g);
      }
    }
    getIds(gr);
    queryBuilder.where(`group.id IN (...:groupIds)`)

      .setParameter('groupIds', groupIds);
  }
  queryBuilder.limit(size).offset(page * size);
  const [data, count] = await queryBuilder.getManyAndCount();

  res.json({
    data,
    total: count
  })
}

export async function createItem(req: Request, res: Response) {
  const item = await AppDataSource.getRepository(Item).save(req.body);

  res.json(item);
}

export async function updateItem(req: Request, res: Response) {
  const item = await AppDataSource.getRepository(Item).findOne({
    where: {
      id: Number(req.params.id)
    }
  })
  if (!item) {
    res.sendStatus(404);
    return;
  }
  await AppDataSource.getRepository(Item).save({
    ...item,
    ...req.body,
    id: Number(req.params.id)
  })
  res.sendStatus(204);
}


export async function deleteItem(req: Request, res: Response) {
  const item = await AppDataSource.getRepository(Item).findOne({
    where: {
      id: Number(req.params.id)
    }
  })
  if (!item) {
    res.sendStatus(404);
    return;
  }
  await AppDataSource.getRepository(Item).delete({
    id: Number(req.params.id)
  })
  res.sendStatus(204);
}