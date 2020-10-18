import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage)
    const orphanages = await orphanageRepository.find({
      relations: ['images']
    })
    return response.json(orphanageView.renderMany(orphanages))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params
    const orphanageRepository = getRepository(Orphanage)
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    })
    return response.json(orphanageView.render(orphanage))
  },

  async create(request: Request, response: Response) {
    const data = { ...request.body }
    const orphanageRepository = getRepository(Orphanage)
    //Correção na falha da tipagem do Multer com envio de Arrays de Arquivos
    const requestImages = request.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    data.images = images
    data.open_on_weekends = data.open_on_weekends = true

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })
    await schema.validate(data, {
      //retorna todos os erros
      abortEarly: false
    })
    const orphanage = orphanageRepository.create(data)
    await orphanageRepository.save(orphanage)
    return response.status(201).json(orphanage)
  }
}