import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import { CompanyFactory, UserFactory } from 'Database/factories'

export default class UsersController {
  public async index() {
    const users = await User.all()

    const companies = await CompanyFactory.createMany(10)
    const user = await UserFactory.create()

    user.related('companies').saveMany(companies)

    return users
  }

  public async store({ request }: HttpContextContract) {
    const userData = await request.validate(StoreUserValidator)

    const user = await User.create(userData)

    return user
  }
}
