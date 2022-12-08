import pgp from "pg-promise"
import Connection from "./Connection";

export default class PgPromiseAdapter implements Connection {
  pgp: any;

  constructor() {
    const url = "postgres://postgres:postgres@localhost:5432/ccca"
    this.pgp = pgp()(url)
  }

  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params)
  }

  async close(): Promise<void> {
    this.pgp.$pool.end()
  }
}