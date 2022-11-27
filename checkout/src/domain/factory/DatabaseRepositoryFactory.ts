import Connection from "../../infra/database/Connection";
import CouponRepositoryDatabase from "../../infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../infra/repository/database/OrderRepositoryDatabase";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: Connection) {}
  
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection)
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }
}