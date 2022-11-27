import ZipCode from "../entity/ZipCode"

export default interface ZipCodeRepository {
  save(zipcode: ZipCode): Promise<void>
  getByCode(code: string): Promise<ZipCode>
}