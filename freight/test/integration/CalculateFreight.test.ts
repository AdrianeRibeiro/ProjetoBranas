import CalculateFreight from "../../src/application/CalculateFreight"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import ZipCodeRepositoryDatabase from "../../src/infra/repository/database/ZipCodeRepositoryDatabase"

test("Deve simular o frete", async function() {
  const connection = new PgPromiseAdapter()
  const zipCodeRepository = new ZipCodeRepositoryDatabase(connection) 
  const calculateFreight = new CalculateFreight(zipCodeRepository)

  const input = {
    orderItems: [
      { volume: 0.03, density: 100, quantity: 1 }
    ]
  }
  const freight = await calculateFreight.execute(input)
  expect(freight).toBe(30)
  await connection.close()
})

test("Deve simular o frete calculando a distancia", async function() {
  const connection = new PgPromiseAdapter()
  const zipCodeRepository = new ZipCodeRepositoryDatabase(connection) 
  const calculateFreight = new CalculateFreight(zipCodeRepository)

  const input = {
    orderItems: [
      { volume: 0.03, density: 100, quantity: 1 }
    ],
    from: "88015600",
    to: "22060030"
  }
  const freight = await calculateFreight.execute(input)
  expect(freight).toBe(22.4466)

  await connection.close()
})