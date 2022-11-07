import Coord from "../../../domain/entity/Coord";
import ZipCode from "../../../domain/entity/ZipCode";
import ZipCodeRepository from "../../../domain/repository/ZipCodeRepository";
import Connection from "../../database/Connection";

export default class ZipCodeRepositoryDatabase implements ZipCodeRepository {

  constructor (readonly connection: Connection) {}

  save(zipcode: ZipCode): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByCode(code: string): Promise<ZipCode> {
    const [zipcodeData] = await this.connection.query("select * from ccca.zipcode where code = $1", [code])
    if(!zipcodeData) throw new Error('Zipcode not found')
    
    const zipcode = new ZipCode(
      zipcodeData.code, 
      zipcodeData.street, 
      zipcodeData.neighborhood, 
      new Coord(parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long))
    )

    return zipcode
  }
}