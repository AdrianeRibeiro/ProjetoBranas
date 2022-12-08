import Checkout from "./application/usecase/Checkout"
import GetOrdersByCpf from "./application/usecase/GetOrdersByCpf"
import Preview from "./application/usecase/Preview"
import ValidateCoupon from "./application/usecase/ValidateCoupon"
import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory"
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway"
import DecrementStockHttpGateway from "./infra/gateway/DecrementStockHttpGateway"
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter"

async function init() {
  const connection = new PgPromiseAdapter()
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  const getItemGateway = new GetItemHttpGateway()
  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const decrementStockGateway = new DecrementStockHttpGateway()
  const preview = new Preview(repositoryFactory.createCouponRepository(), getItemGateway, calculateFreightGateway)
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway, decrementStockGateway, queue)
  const getOrderByCpf = new GetOrdersByCpf(repositoryFactory.createOrderRepository())
  const validateCoupon = new ValidateCoupon(repositoryFactory.createCouponRepository())
  const httpServer = new ExpressAdapter()
  new RestController(httpServer, preview, checkout, getOrderByCpf, validateCoupon)
  httpServer.listen(3000)
}

init()




