const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/task.js')
const userRouter = require('./routers/user.js')

const app = express()
const port = process.env.PORT // Port located in environment file

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    if (process.env.port) {
        console.log('Server is up on production port')
    }
    console.log(`Listening on http://127.0.0.1:${port}`)
})