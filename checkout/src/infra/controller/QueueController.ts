import Checkout from "../../application/usecase/Checkout";
import CheckoutHandler from "../../application/usecase/CheckoutHandler";
import Queue from "../queue/Queue";

export default class QueueController {
  constructor(readonly queue: Queue, readonly checkout: CheckoutHandler) {
    queue.on("placeOrder", "placeOrder.checkout", async function(msg: any) {
      await checkout.execute(msg)
    })
  }
}