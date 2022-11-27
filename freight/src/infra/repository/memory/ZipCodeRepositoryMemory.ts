import ZipCode from "../../../domain/entity/ZipCode";
import ZipCodeRepository from "../../../domain/repository/ZipCodeRepository";

export default class ZipCodeRepositoryMemory implements ZipCodeRepository {
  zipcodes: ZipCode[]

  constructor() {
    this.zipcodes = []
  }

  async save(zipcode: ZipCode): Promise<void> {
    this.zipcodes.push(zipcode)
  }

  async getByCode(code: string): Promise<ZipCode> {
    const zipcode = this.zipcodes.find(zipcode => zipcode.code === code)
    if (!zipcode) throw new Error("Zipcode not found")

    return zipcode
  }
}