import Order from "../../domain/entity/Order"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import CouponRepository from "../../domain/repository/CouponRepository"
import OrderRepository from "../../domain/repository/OrderRepository"
import Queue from "../../infra/queue/Queue"
import CalculateFreightGateway from "../gateway/CalculateFreightGateway"
import DecrementStockGateway from "../gateway/DecrementStockGateway"
import GetItemGateway from "../gateway/GetItemGateway"


export default class Checkout {
  couponRepository: CouponRepository
  orderRepository: OrderRepository

  constructor(
    repositoryFactory: RepositoryFactory,
    readonly getItemGateway: GetItemGateway,
    readonly calculateFreightGateway: CalculateFreightGateway,
    readonly decrementStockGateway: DecrementStockGateway,
    readonly queue: Queue
  ) {
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute(input: Input): Promise<void> {
    const sequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.date, sequence)
    const orderItems = []

    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
      orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity })
      //await this.decrementStockGateway.execute(orderItem.idItem, orderItem.quantity)
      await this.queue.publish("checkout", { IdItem: orderItem.idItem, quantity: orderItem.quantity })
    }

    order.freight = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to)

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
  date?: Date,
  from?: string,
  to?: string
}