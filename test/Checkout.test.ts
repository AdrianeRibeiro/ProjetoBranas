import Checkout from "../src/application/Checkout"
import GetOrdersByCpf from "../src/application/GetOrdersByCpf"
import Coupon from "../src/domain/entity/Coupon"
import Item from "../src/domain/entity/Item"
import CouponRepositoryMemory from "../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../src/infra/repository/memory/ItemRepositoryMemory"
import OrderRepositoryMemory from "../src/infra/repository/memory/OrderRepositoryMemory"

test("Deve simular um pedido", async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000))
  itemRepository.save(new Item(2, "Amplificador", 5000))
  itemRepository.save(new Item(3, "Cabo", 30))

  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()

  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ]
  }

  await checkout.execute(input)
  const getOrderByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrderByCpf.execute("317.153.361-86")
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(6090)
})


test("Deve fazer o pedido com desconto", async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000))
  itemRepository.save(new Item(2, "Amplificador", 5000))
  itemRepository.save(new Item(3, "Cabo", 30))

  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon("VALE20", 20))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    date: new Date("2022-03-01T10:00:00")
  }

  await checkout.execute(input)
  const getOrderByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrderByCpf.execute("317.153.361-86")
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(4872)
})

test("Deve fazer o pedido com desconto expirado", async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000))
  itemRepository.save(new Item(2, "Amplificador", 5000))
  itemRepository.save(new Item(3, "Cabo", 30))

  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00")))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    date: new Date("2022-03-01T10:00:00")
  }

  await checkout.execute(input)
  const getOrderByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrderByCpf.execute("317.153.361-86")
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(6090)
})


test("Deve fazer o pedido com desconto não expirado", async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, "Guitarra", 1000))
  itemRepository.save(new Item(2, "Amplificador", 5000))
  itemRepository.save(new Item(3, "Cabo", 30))

  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon("VALE20", 20, new Date("2022-03-01T10:00:00")))
  const checkout = new Checkout(itemRepository, orderRepository, couponRepository)
  
  const input = {
    cpf: "317.153.361-86",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    date: new Date("2021-03-01T10:00:00")
  }

  await checkout.execute(input)
  const getOrderByCpf = new GetOrdersByCpf(orderRepository)
  const orders = await getOrderByCpf.execute("317.153.361-86")
  expect(orders).toHaveLength(1)
  expect(orders[0].total).toBe(6090)
})