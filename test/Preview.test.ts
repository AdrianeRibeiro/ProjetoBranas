import Preview from "../src/application/Preview"
import Coord from "../src/domain/entity/Coord"
import Coupon from "../src/domain/entity/Coupon"
import Dimension from "../src/domain/entity/Dimension"
import Item from "../src/domain/entity/Item"
import ZipCode from "../src/domain/entity/ZipCode"
import CouponRepositoryMemory from "../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../src/infra/repository/memory/ItemRepositoryMemory"
import ZipCodeRepositoryMemory from "../src/infra/repository/memory/ZipCodeRepositoryMemory"

let preview: Preview

beforeEach(function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000))
  itemRepository.save(new Item(2, "Amplificador", 5000))
  itemRepository.save(new Item(3, "Cabo", 30))

  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon("VALE20", 20))

  const zipCodeRepository = new ZipCodeRepositoryMemory()
  zipCodeRepository.save(new ZipCode("88015600", "Rua Almirante Lamego", "Centro", new Coord(-27.5945, -48.5477)))
  zipCodeRepository.save(new ZipCode("22060030", "Rua Aires Saldanha", "Copacabana", new Coord(-22.9129, -43.2003)))

  preview = new Preview(itemRepository, couponRepository, zipCodeRepository)
})

test("Deve simular um pedido", async function() {
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ]
  }

  const total = await preview.execute(input)
  expect(total).toBe(6090)
})

test("Deve simular um pedido com desconto", async function() {

  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20"
  }

  const total = await preview.execute(input)
  expect(total).toBe(4872)
})


test("Deve simular um pedido com distância", async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)))
  itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)))
  itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)))

  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon("VALE20", 20))

  const zipCodeRepository = new ZipCodeRepositoryMemory()
  zipCodeRepository.save(new ZipCode("88015600", "Rua Almirante Lamego", "Centro", new Coord(-27.5945, -48.5477)))
  zipCodeRepository.save(new ZipCode("22060030", "Rua Aires Saldanha", "Copacabana", new Coord(-22.9129, -43.2003)))

  preview = new Preview(itemRepository, couponRepository, zipCodeRepository)
  
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    from: "88015600",
    to: "22060030"
  }

  const total = await preview.execute(input)
  expect(total).toBe(5334.0905999999995)
})