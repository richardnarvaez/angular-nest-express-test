const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = 3000
const SECRET_KEY = process.env.JWT_SECRET_KEY

app.use(
   cors({
      origin: ['http://localhost:4200', 'http://localhost:3000'],
      credentials: true,
   })
)

app.post('/api/posts', verifyToken, (req, res) => {
   const { authData } = req
   if (authData) {
      res.json({
         message: 'Post created!',
         authData,
      })
   } else {
      res.sendStatus(403)
   }
})

app.post('user-profile', verifyToken, (req, res) => {
   return {
      id: 1,
      username: 'john',
      email: 'john@mail.com',
   }
})

app.post('/api/login', (req, res) => {
   // Mock user
   console.log('req.headers', 'LOGIN')
   const user = {
      id: 1,
      username: 'john',
      email: 'john@mail.com',
   }

   jwt.sign({ user }, SECRET_KEY, { expiresIn: '30s' }, (err, token) => {
      if (err) {
         res.sendStatus(500)
      }
      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
      res.json({ token })
   })
})

function verifyToken(req, res, next) {
   // Get auth header value

   console.log('>>>', req.headers['authorization'])
   const bearerHeader = req.headers['authorization']

   if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      jwt.verify(token, SECRET_KEY, (err, authData) => {
         if (err) {
            res.sendStatus(403)
         } else {
            req.authData = authData
            next()
         }
      })
   } else {
      res.sendStatus(403)
   }
}

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`))
