require('dotenv').config({ path: '.env' })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('MongoDB is successfully connected.'))

const medsRouter = require('./routes/meds')
app.use('/', medsRouter)

app.listen(process.env.PORT_NUMBER, () => console.log(`Server has started at PORT ${process.env.PORT_NUMBER}.`))
