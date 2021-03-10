const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const connectionURL = process.env.CONNECTION_URL
const database = process.env.DATABASE

mongoose.connect(`${connectionURL}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
