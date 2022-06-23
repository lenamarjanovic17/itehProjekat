import { Request, Response } from "express";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { v4 } from 'uuid'
export const uplaodMiddleware = multer({
  dest: '/img'
}).fields([
  {
    name: 'img',
    maxCount: 1
  }
])
export function renameFile(request: Request, res: Response, next?: any) {

  if (!request.files) {
    next();
    return;
  }
  //@ts-ignore
  if (!request.files.img) {
    next();
    return;
  }
  //@ts-ignore
  const file = request.files.img[0];
  const tempPath = file.path;
  const imgName = 'img/' + v4() + '-' + file.originalname
  const targetPath = path.resolve(imgName);
  console.log(targetPath);
  (request as any).fileUrl = 'https://localhost:8000/' + imgName;
  fs.rename(tempPath, targetPath, (err) => {
    console.log(err);
  })
  next();
}