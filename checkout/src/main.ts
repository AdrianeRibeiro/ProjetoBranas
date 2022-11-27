import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import SimulateFreight from "./application/SimulateFreight"
import Coupon from "./domain/entity/Coupon"
import Item from "./domain/entity/Item"
import OrderController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import MemoryRepositoryFactory from "./infra/factory/RepositoryFactoryMemory"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import CouponRepositoryMemory from "./infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase"
import ZipCodeRepositoryDatabase from "./infra/repository/database/ZipCodeRepositoryDatabase"
import ItemRepositoryMemory from "./infra/repository/memory/ItemRepositoryMemory"
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory"
import CalculateFreightGateway from "./application/gateway/CalculateFreightGateway"
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway"

/*const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, "Guitarra", 1000))
itemRepository.save(new Item(2, "Amplificador", 5000))
itemRepository.save(new Item(3, "Cabo", 30))*/

const connection = new PgPromiseAdapter()
const itemRepository = new ItemRepositoryDatabase(connection)

const orderRepository = new OrderRepositoryMemory()
const couponRepository = new CouponRepositoryMemory()
couponRepository.save(new Coupon("VALE20", 20))

const repositoryFactory = new MemoryRepositoryFactory()
const zipCodeRepository = new ZipCodeRepositoryDatabase(connection) 

const calculateFreightGateway = new CalculateFreightHttpGateway()
const preview = new Preview(itemRepository, couponRepository, calculateFreightGateway)
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)

const httpServer = new ExpressAdapter()

new OrderController(httpServer, preview, checkout, getOrderByCpf, simulateFreight)

httpServer.listen(3000)