const express = require('express')
const app = express()
const db = require('./db')
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())



// get method 
app.get('/', (req, res) => {
  res.send('Welcome to our Hotel ')
})




// Import router files 
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

//Use the Router files 
app.use('/person',personRoutes)
app.use('menu',menuItemRoutes)



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
