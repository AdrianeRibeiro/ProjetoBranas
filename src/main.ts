import Checkout from "./application/Checkout"
import GetOrdersByCpf from "./application/GetOrdersByCpf"
import Preview from "./application/Preview"
import SimulateFreight from "./application/SimulateFreight"
import Coupon from "./domain/entity/Coupon"
import Item from "./domain/entity/Item"
import OrderController from "./infra/controller/OrderController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import MemoryRepositoryFactory from "./infra/factory/RepositoryFactoryMemory"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import CouponRepositoryMemory from "./infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryDatabase from "./infra/repository/memory/database/ItemRepositoryDatabase"
import ItemRepositoryMemory from "./infra/repository/memory/ItemRepositoryMemory"
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory"

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

const preview = new Preview(itemRepository, couponRepository)
const checkout = new Checkout(repositoryFactory)
const getOrderByCpf = new GetOrdersByCpf(orderRepository)
const simulateFreight = new SimulateFreight(itemRepository)
const httpServer = new ExpressAdapter()

new OrderController(httpServer, preview, checkout, getOrderByCpf, simulateFreight)

httpServer.listen(3000)