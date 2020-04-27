import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

import responseMiddleware from './middlewares/Response.middleware'

import database from './utils/database'

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())

        // middlware de tratamento de resposta
        this.express.use(responseMiddleware)
    }

    private database(): void {
        mongoose
            .connect(`mongodb://${database.mongo.user}:${database.mongo.pass}@${database.mongo.alternativeHost}:27017/${database.mongo.dbName}`, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                auth: {
                    user: database.mongo.user,
                    password: database.mongo.pass
                }
            })
            .then(() => console.log('DB Connected!'))
            .catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
            });
        // mongoose
        //     .connect(`${database.mongo.alternativeHost}/${database.mongo.dbName}`, {
        //         useUnifiedTopology: true,
        //         useNewUrlParser: true,
        //         auth: {
        //             user: database.mongo.user,
        //             password: database.mongo.pass
        //         }
        //     })
        //     .then(() => console.log('DB Connected!'))
        //     .catch(err => {
        //         console.log(`DB Connection Error: ${err.message}`);
        //     });
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express
