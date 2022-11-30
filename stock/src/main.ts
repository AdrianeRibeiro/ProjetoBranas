import RestController from "./infra/controller/RestController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"

const connection = new PgPromiseAdapter()
const httpServer = new ExpressAdapter()
new RestController(httpServer)
httpServer.listen(3003)