import Checkout from "../../application/usecase/Checkout"
import GetOrdersByCpf from "../../application/usecase/GetOrdersByCpf"
import Preview from "../../application/usecase/Preview"
import ValidateCoupon from "../../application/usecase/ValidateCoupon"
import HttpServer from "../http/HttpServer"

export default class RestController {

  constructor(
    readonly httpServer: HttpServer, 
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrderByCpf: GetOrdersByCpf,
    readonly validateCoupon: ValidateCoupon
  ) {
    httpServer.on("post", "/preview", async function(params: any, body: any) {
      const total = await preview.execute(body)
    
      return { total }
    })

    httpServer.on("post", "/validateCoupon", async function (params: any, body: any) {
			const output = await validateCoupon.execute(body);
			return output;
		});
    
    httpServer.on("post", "/checkout", async function(params: any, body: any) {
      checkout.execute(body)
    })
    
    httpServer.on("get", "/orders/:cpf", async function(params: any, body: any) {
      const orders = await getOrderByCpf.execute(params.cpf)
      
      return orders
    })
  }
}