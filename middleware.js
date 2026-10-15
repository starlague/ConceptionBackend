const express = require('express')

const app = express()
const port = 3000

function loggerMiddleware(request, response, next) {
    console.log('nouvelle requête entrante')
    next()
}

app.use(loggerMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`)
})