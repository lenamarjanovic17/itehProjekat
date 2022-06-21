import { NextFunction, Request, Response } from "express"
import { createGroup, deleteGroup, getAllGroups, getBaseGroups } from "./handler/itemGroupHandler"
import { createItem, deleteItem, getItems, getOneItem, updateItem } from "./handler/itemHandler"
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
        handler: [getBaseGroups]
    }, {
        method: 'get',
        url: '/admin/item-group',
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
        method: 'get',
        url: '/item/:id',
        handler: [getOneItem]
    },
    {
        method: 'post',
        url: '/item',
        handler: [isAdmin, createItem]
    },
    {
        method: 'patch',
        url: '/item/:id',
        handler: [isAdmin, updateItem]
    },
    {
        method: 'delete',
        url: '/item/:id',
        handler: [isAdmin, deleteItem]
    },
    {
        method: 'post',
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
        method: 'get',
        url: '/order',
        handler: [isAdmin, getOrders]
    },
]