import { NextFunction, Request, Response } from "express"
import { createGroup, deleteGroup, getAllGroups } from "./handler/itemGroupHandler"
import { createItem, deleteItem, getItems, updateItem } from "./handler/itemHandler"
import { changeStatus, createOrder, getOrders } from "./handler/orderHandler"

interface IRoute {
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    handler: ((req: Request, res: Response, next?: NextFunction) => any)[]
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.session as any).user.admin) {
        res.sendStatus(403);
        return;
    }
    next()
}


export const Routes: IRoute[] = [
    {
        method: 'get',
        url: '/item-group',
        handler: [getAllGroups]
    }, {
        method: 'post',
        url: '/item-group',
        handler: [createGroup]
    },
    {
        method: 'delete',
        url: '/item-group/:id',
        handler: [deleteGroup]
    },
    {
        method: 'get',
        url: '/item',
        handler: [getItems]
    },
    {
        method: 'post',
        url: '/item',
        handler: [createItem]
    },
    {
        method: 'patch',
        url: '/item/:id',
        handler: [updateItem]
    },
    {
        method: 'delete',
        url: '/item/:id',
        handler: [deleteItem]
    },
    {
        method: 'get',
        url: '/order',
        handler: [createOrder]
    },
    {
        method: 'patch',
        url: '/order/:id/accept',
        handler: [isAdmin, changeStatus('ACCEPTED')]
    },
    {
        method: 'patch',
        url: '/order/:id/reject',
        handler: [isAdmin, changeStatus('REJECTED')]
    },
    {
        method: 'patch',
        url: '/order/:id/deliver',
        handler: [isAdmin, changeStatus('DELIVERED')]
    },
    {
        method: 'post',
        url: '/order',
        handler: [getOrders]
    },
]