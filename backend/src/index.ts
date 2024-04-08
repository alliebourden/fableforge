import express from 'express'
import { userRouter, SessionRouter } from './api'
import pool from './db/connection'

const PORT = process.env.PORT ?? 5001

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/session', SessionRouter)

async function test() {
    let res = await pool.query("select * from loot_manager where item = 'crossbow'")
    console.log(res)
}

test();

/**
 * Exercise:
 * Implement a new data model and corresponding API. At the end of the day you should
 * create a model that interests you, and progresses your project in some way, but if
 * you can't think of anything, try creating a model for a collection of books which
 * may have the following properties:
 *  - ISBN
 *  - title
 *  - author
 *  - etc...
 * and lives at /api/book
 *
 * Whatever you decide be sure to implement the full set of POST, GET, PUT, and DELETE
 * operations assuming that makes sense in your case.
 */

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
