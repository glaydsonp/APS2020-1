import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

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
    }

    private database(): void {
        // mongoose.connect('mongodb://localhost:27017/tsnode', {
        //     useNewUrlParser: true
        // })

        mongoose
            .connect('mongodb://localhost:27017/admin', {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                auth: {
                    user: 'root',
                    password: 'MongoDB2019!'
                }
            })
            .then(() => console.log('DB Connected!'))
            .catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
            });
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express
