import express from 'express'
import { userRouter, SessionRouter } from './api'
import pool from './db/connection'

const PORT = process.env.PORT ?? 5001

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/session', SessionRouter)



async function select() {
    let res = await pool.query("select * from loot_manager where item = 'crossbow'")
    console.log(res)
}

// select();

async function update() {
    let res = await pool.query("update loot_manager set item = 'rapier' where loot_id = 2")
    console.log(res)
}

// update();

async function insertInto() {
    let res = await pool.query("insert loot_manager (item, description, note) values ('potion of flying', 'When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover.' , 'purchased from a merchant')")
    console.log(res)
}

// insertInto();

async function deleteItem() {
    let res = await pool.query("delete from loot_manager where item='rapier'")
    console.log(res)
}

// deleteItem();

async function create() {
    let res = await pool.query("CREATE TABLE TestTable (test_id int, tile varchar(255), body varchar(600))")
    console.log(res)
}

// create();

async function alter() {
    let res = await pool.query("alter table testtable add comments varchar(400)")
    console.log(res)
}

alter();

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
