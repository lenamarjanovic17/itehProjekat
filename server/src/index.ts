import "reflect-metadata";
import * as express from "express";
import * as cors from 'cors'
import * as session from 'express-session'
import * as fs from 'fs';
import * as https from 'https';
import { AppDataSource } from "./data-source"
import { renameFile, uplaodMiddleware } from "./upload";
import { Routes } from "./routes";
import { User } from "./entity/User";

AppDataSource.initialize().then(async () => {

    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }))
    app.use(session({
        secret: 'adsfdghsgearfsgrdthftehetrt',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: true
        }
    }))


    app.post('/login', async (req, res) => {
        const user = await AppDataSource.getRepository(User).findOne({
            where: req.body
        });
        if (!user) {
            res.sendStatus(400);
            return;
        }
        (req.session as any).user = user;
        req.session.save();
        res.json(user);
    })

    app.post('/register', async (req, res) => {
        let user = await AppDataSource.getRepository(User).findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            res.sendStatus(400);
            return;
        }
        user = await AppDataSource.getRepository(User).save(req.body);
        (req.session as any).user = user;
        req.session.save();
        res.json(user);
    })

    app.use((request, response, next) => {
        const user = (request.session as any).user as User | undefined;
        if (!user) {
            response.status(401).json({ error: 'Unauthorized' })
            return;
        }
        next();
    });

    app.get('/check', async (req, res) => {
        res.json((req.session as any).user);
    })

    app.post('/logout', async (req, res) => {
        req.session.destroy(err => { })
        res.sendStatus(204);
    })

    app.post('/upload', uplaodMiddleware, renameFile('img'), (req, res) => {
        res.json({
            fileUrl: (req as any).fileUrl
        })
    })
    app.use('/img', express.static('img', {
        extensions: ['png', 'jpg', 'jpeg']
    }))


    for (let route of Routes) {
        app[route.method](route.url, ...route.handler);
    }

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)


    server.listen(8000, () => {
        console.log('Server is listening on https://localhost:8000')
    })

}).catch(error => console.log(error))
