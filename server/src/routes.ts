import { NextFunction, Request, Response } from "express"

interface IRoute {
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    handler: ((req: Request, res: Response, next?: NextFunction) => any)[]
}

export const Routes: IRoute[] = []