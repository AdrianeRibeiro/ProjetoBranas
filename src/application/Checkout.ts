import ItemRepository from "../domain/repository/ItemRepository"
import Order from "../domain/entity/Order"
import OrderRepository from "../domain/repository/OrderRepository"
import CouponRepository from "../domain/repository/CouponRepository"

export default class Checkout {
  constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {}

  async execute(input: Input): Promise<void> {
    const sequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.date, sequence)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }

    if(input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      if(coupon) order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)
  }
} 

type Input = {
  cpf: string,
  orderItems: { idItem: number, quantity: number }[],
  coupon?: string,
  date?: Date
}
