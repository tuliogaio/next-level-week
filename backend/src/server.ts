import express from 'express'
import path from 'path'
import 'express-async-errors'
import cors from 'cors'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(4000)

// ACESSO A BANCO
// QUERY NATIVO - sqlite3.query('SELECT * FROM users WHERE name = 'Tulio')
// QUERY BUILDER - knex('users').select('*').where('users','Túlio')
// ORM - Baseado em objetos (instância de classes, reflexo das tabelas do Banco)