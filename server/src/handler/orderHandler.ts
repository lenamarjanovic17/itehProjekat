import { TargetLocation } from "../entity/TargetLocation";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { Item } from "../entity/Item";
import { User } from "../entity/User";

interface OrderItemDto {
  itemId: number,
  count: number
}

interface OrderDto {
  targetLocation: TargetLocation,
  orderItems: OrderItemDto[]
}


export async function createOrder(req: Request, res: Response) {

  const body = req.body as OrderDto;
  const user = (req.session as any).user as User;
  const createdOrder = await AppDataSource.manager.transaction(async manager => {
    const order = await manager.save(Order, {
      status: 'PENDING',
      createdAt: new Date(),
      user,
      targetLocation: body.targetLocation,
      orderItems: []
    });

    for (let itemDto of body.orderItems) {
      const item = await manager.findOne(Item, { where: { id: itemDto.itemId } })
      const orderItem = await manager.save(OrderItem, {
        order: order,
        count: itemDto.count,
        itemPrice: item.price,
        itemName: item.name,
        item: item
      });
      order.orderItems.push(orderItem);
      return order;
    }

  });

  res.json({
    ...createdOrder,
    orderItems: createdOrder.orderItems.map(element => {
      const { order, ...rest } = element;
      return rest
    })
  });
}

const typesMap = {
  'ACCEPTED': 'acceptedAt',
  'REJECTED': 'rejectedAt',
  'DELIVERED': 'delivereddAt',
}

const transitions = {
  'PENDING': ['ACCEPTED', 'REJECTED'],
  'ACCEPTED': 'DELIVERED',
  'DELIVERED': [],
  'REJECTED': []
}

export function changeStatus(status: 'ACCEPTED' | 'REJECTED' | 'DELIVERED') {

  return async function f(req: Request, res: Response) {

    let order = await AppDataSource.getRepository(Order).findOne({ where: { id: Number(req.params.id) } })
    if (!order) {
      res.sendStatus(404);
      return;
    }
    if (!transitions[order.status].includes(status)) {
      res.sendStatus(400);
    }
    await AppDataSource.getRepository(Order).update(order.id, {
      status: status,
      [typesMap[status]]: new Date()
    })
    res.sendStatus(204);
  }
}

export async function getOrders(req: Request, res: Response) {
  const orders = await AppDataSource.getRepository(Order).find({
    relations: {
      orderItems: true,
      user: true,
    }
  })
  res.json(orders);
}

