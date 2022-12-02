import Coupon from "../../src/domain/entity/Coupon"
import Dimension from "../../src/domain/entity/Dimension"
import Item from "../../src/domain/entity/Item"
import Order from "../../src/domain/entity/Order"

test("Não deve criar um pedido com CPF inválido", function() {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("CPF inválido"))
})

test("Deve criar um pedido sem itens", function() {
  const order = new Order("259.556.978-37")

  expect(order.getTotal()).toBe(0)
})

test("Deve criar um pedido com 3 itens", function() {
  const order = new Order("259.556.978-37")
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  order.addItem(new Item(2, "Amplificador", 5000), 1)
  order.addItem(new Item(3, "Cabo", 30), 3)

  expect(order.getTotal()).toBe(6090)
})

test("Deve criar um pedido com 3 itens com cupom de desconto", function() {
  const order = new Order("259.556.978-37")
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  order.addItem(new Item(2, "Amplificador", 5000), 1)
  order.addItem(new Item(3, "Cabo", 30), 3)
  order.addCoupon(new Coupon("VALE20", 20))

  expect(order.getTotal()).toBe(4872)
})

test("Deve criar um pedido com 3 itens com cupom de desconto expirado", function() {
  const order = new Order("259.556.978-37", new Date("2022-03-01T10:00:00"))
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  order.addItem(new Item(2, "Amplificador", 5000), 1)
  order.addItem(new Item(3, "Cabo", 30), 3)
  order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00")))

  expect(order.getTotal()).toBe(6090)
})

test("Deve criar um pedido com 3 itens com cupom de desconto não expirado", function() {
  const order = new Order("259.556.978-37", new Date("2021-03-01T10:00:00"))
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  order.addItem(new Item(2, "Amplificador", 5000), 1)
  order.addItem(new Item(3, "Cabo", 30), 3)
  order.addCoupon(new Coupon("VALE20", 20, new Date("2022-03-01T10:00:00")))

  expect(order.getTotal()).toBe(4872)
})

test("Não deve criar um pedido com um item com quantidade negativa", function() {
  const order = new Order("259.556.978-37")
  expect(() => order.addItem(new Item(1, "Guitarra", 1000), -1)).toThrow(new Error("Invalid quantity"))
})

test("Não deve criar um pedido com um item repetido", function() {
  const order = new Order("259.556.978-37")
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  expect(() => order.addItem(new Item(1, "Guitarra", 1000), 1)).toThrow(new Error("Duplicated Item"))
})

test("Deve criar um pedido com frete", function() {
  const order = new Order("259.556.978-37")
  order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1)
  order.freight = 30
  expect(order.getTotal()).toBe(1030)
})

test("Deve criar um pedido com código", function() {
  const order = new Order("259.556.978-37", new Date("2022-02-01T10:00:00"))
  order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1)

  expect(order.getCode()).toBe("202200000001")
})