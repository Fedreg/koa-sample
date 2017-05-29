import Koa from 'koa'
import Router from 'Koa-router'
import * as funcs from './Utils/funcs.js'
import * as users from './Controllers/user-controller.js'

const koa = new Koa()
const app = new Router()

/*-------------------------------------
Routes
-------------------------------------*/
app.get('/user/:id', (ctx) => {
    let par = ctx.params
    users.getUser(par.id)
    .then((user) => {
        ctx.body = `name: ${user.name}\n sign: ${user.zodiac}\n id: ${user.id}`
    })
    .catch()
})

app.get('/:name/:times', (ctx) => {
    let par = ctx.params
    funcs.multYourName(par.name, par.times)
    .then((newName) => {
        ctx.body = `Hello, ${newName}!\n`
    })
    .catch()
})

app.get('/math/:a/:operator/:b', (ctx) => {
    let par = ctx.params
    funcs.doSomeMath(par.a, par.operator, par.b)
    .then((value) => {
        ctx.body = `${par.a} ${par.operator} ${par.b} equals ${value}!`
    })
    .catch()
})

app.get('/:name', async (ctx) => {
  ctx.body = `Hello, ${ctx.params.name}!\n`
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
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

/*-------------------------------------
Init
-------------------------------------*/

koa.use(app.routes())

koa.listen(3500)