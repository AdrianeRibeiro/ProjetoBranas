import HttpClient from "../infra/HttpClient";
import CheckoutGateway from "./CheckoutGateway";

export default class CheckoutHttpGateway implements CheckoutGateway {

  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async preview(order: any): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/preview`, order)
  }

  async checkout(order: any): Promise<any> {
    await this.httpClient.post(`${this.baseUrl}/checkout`, order)
  }

  async validateCoupon(code: string): Promise<boolean> {
    return this.httpClient.post(`${this.baseUrl}/validateCoupon`, { code })
  }

  async getOrdersByCpf(cpf: string): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/orders/${cpf}`)
  }
}