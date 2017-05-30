import Koa from 'koa'
import Router from 'Koa-router'
import Pug from 'js-koa-pug'
import fs from 'fs'
import path from 'path'

import * as funcs from './src/Utils/funcs.js'
import * as users from './src/Controllers/user-controller.js'

const koa = new Koa()
const app = new Router()

// Use Pug template to render views
app.use(Pug('src/Views'))

/*-------------------------------------
Routes
-------------------------------------*/

// id : Int
app.get('/user/:id', (ctx) => {
    let par = ctx.params
    users.getUser(par.id)
        .then((user) => {
            ctx.body = `name: ${user.name}\n sign: ${user.zodiac}\n id: ${user.id}`
        })
        .catch()
})

// name : String
app.get('/name/:person', async (ctx) => {
    ctx.body = `Hello, ${ctx.params.person}!\n`
})

// name : String -> times: Int
app.get('/:name/:times', (ctx) => {
    let par = ctx.params
    funcs.multYourName(par.name, par.times)
        .then((newName) => {
            ctx.render('howdy', { name: newName })
        })
        .catch()
})

// a : Int -> operator : String -> b : Int
app.get('/math/:a/:operator/:b', (ctx) => {
    let par = ctx.params
    funcs.doSomeMath(par.a, par.operator, par.b)
        .then((value) => {
            ctx.render('math', { a: par.a, operator: par.operator, b: par.b, val: value })
        })
        .catch()
})

//read a file
app.get('/story', (ctx) => {
    let dir = path.join(__dirname, 'src/Utils/sample.txt')
    funcs.readData(dir)
        .then((data) => {
            console.log("Content:", data)
            ctx.body = `${data}` 
        })
        .catch()
})

// default route
app.get('/', async (ctx) => {
    ctx.render('home')
})

// 404
app.get('/*', async (ctx) => {
   ctx.render('404')
})

/*-------------------------------------
Logger
-------------------------------------*/

koa.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

koa.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms} ${ctx.status}`)
})

/*-------------------------------------
Init
-------------------------------------*/

koa.use(app.routes())

koa.listen(3500)
console.log("Koa listening on port 3500")
