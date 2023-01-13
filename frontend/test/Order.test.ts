import Item from "../src/entities/Item"
import Order from "../src/entities/Order"

test("Deve criar um pedido", function () {
  const order = new Order("317.513.361-86")
  order.addItem(new Item(1, "Guitarra", 1000))
  order.addItem(new Item(1, "Guitarra", 1000))
  order.addItem(new Item(1, "Guitarra", 1000))
  expect(order.orderItems).toHaveLength(1)
  expect(order.orderItems[0].quantity).toBe(3)
})