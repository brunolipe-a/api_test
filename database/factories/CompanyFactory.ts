import Factory from '@ioc:Adonis/Lucid/Factory'
import Company from 'App/Models/Company'

export const CompanyFactory = Factory.define(Company, ({ faker }) => {
  return {
    company_name: faker.company.companyName(),
    cnpj: faker.random.alphaNumeric(20),
    url: faker.internet.url(),
  }
}).build()
