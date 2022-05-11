import { Request, Response } from "express";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { v4 } from 'uuid'
export const uplaodMiddleware = multer({
  dest: '/img', fileFilter: function (_req, file, cb) {
    if (!file) {
      cb(null, false)
    } else {
      cb(null, true);
    }
  }
}).fields([
  {
    name: 'img',
    maxCount: 1
  }
])


export function renameFile(name: string) {

  return function handleUpload(request: Request, res: Response, next?: any) {

    if (!request.files) {
      next();
      return;
    }
    if (!request.files[name]) {
      next();
      return;
    }
    const file = request.files[name][0];
    const tempPath = file.path;
    const imgName = 'img/' + v4() + '-' + file.originalname
    const targetPath = path.resolve(imgName);
    (request as any).fileUrl = 'https://localhost:8000/' + imgName;
    fs.rename(tempPath, targetPath, () => {

    })
    next();
  }
}