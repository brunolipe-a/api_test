import Database from '@ioc:Adonis/Lucid/Database'
import { CompanyFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const request = supertest(process.env.APP_URL)

test.group('Company', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should be able to list empty', async (assert) => {
    const { body } = await request.get('/companies').expect(200)

    assert.isArray(body)
    assert.isUndefined(body[0])
    assert.notExists(body.errors)
  })

  test('it should be able to list companies', async (assert) => {
    const companiesCount = 10

    await CompanyFactory.createMany(companiesCount)

    const { body } = await request.get('/companies').expect(200)

    assert.lengthOf(body, companiesCount)
    assert.notExists(body.errors)
  })
})
