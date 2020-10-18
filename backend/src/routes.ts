import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

// ROTA - CONJUNTO
// RECURSTO - USERS

// MÉTODOS - HTTP = GET, POST, PUT, DELETE
// PARÂMETROS
// Query Params: http://localhost:4000/users?search='Tulio'
// Route Params: http://localhost:4000/users/1 (ID)
// Body Params: http://localhost:4000/users/create (Formulários)

// GET - BUSCANDO UMA INFORMAÇÃO
// POST - ENVIANDO UMA INFORMAÇÃO
// PUT - ATUALIZANDO UMA INFORMAÇÃO
// DELETE - DELETANDO UMA INFORMAÇÃO

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create) 

export default routes