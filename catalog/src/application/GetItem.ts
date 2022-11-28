import ItemRepository from "../domain/repository/ItemRepository"

export default class SimulateFreight {

  constructor(readonly itemRepository: ItemRepository) {}

  async execute(idItem: number): Promise<Output> {
    const item = await this.itemRepository.getItem(idItem)

    return {
      idItem: item.idItem,
      description: item.description,
      price: item.price,
      volume: item.getVolume(),
      density: item.getDensity()
    }
  }
}

type Output = {
  idItem: number,
  description: string,
  price: number,
  volume: number,
  density: number
}