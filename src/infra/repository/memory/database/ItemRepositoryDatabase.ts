import Item from "../../../../domain/entity/Item";
import ItemRepository from "../../../../domain/repository/ItemRepository";
import Connection from "../../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {

  constructor(readonly connection: Connection) {

  }

  async getItem(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query("select * from item where id_item = $1", [idItem])
    return new Item(itemData.id_item, itemData.description, parseFloat(itemData.price))
  } 

  save(item: Item): Promise<void> {
    throw new Error("Method not implemented.");
  }
}