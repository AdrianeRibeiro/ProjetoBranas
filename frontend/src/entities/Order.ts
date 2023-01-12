import Item from "./Item"
import Observable from "./Observable"
import OrdemItem from "./OrderItem"

export default class Order extends Observable {
  orderItems: OrdemItem[]
  coupon: string = ""

  constructor(readonly cpf: string) {
    super()
    this.orderItems = []
  }

  addItem(item: Item) {
    const existingOrderItem = this.orderItems.find((orderItem: OrdemItem) => orderItem.idItem === item.idItem)
    if(existingOrderItem) {
      existingOrderItem.quantity++
    } else {
      this.orderItems.push(new OrdemItem(item.idItem, 1))
    }

    this.notify("addItem")
  }

  removeOrderItem(orderItem: OrdemItem) {
    const existingOrderItem = this.orderItems.find((order: OrdemItem) => order.idItem === orderItem.idItem)
    if(existingOrderItem) {
      existingOrderItem.quantity--
      if(existingOrderItem.quantity == 0) {
        this.orderItems.splice(this.orderItems.indexOf(existingOrderItem), 1)
      }
    }

    this.notify("removeOrderItem")
  }
}