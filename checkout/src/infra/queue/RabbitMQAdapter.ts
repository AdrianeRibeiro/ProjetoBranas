import Queue from "./Queue";
import amqp from "amqplib"

export default class RabbitMQAdapter implements Queue {
  connection: any

  constructor() {}

  async connect(): Promise<void> {
    const amqp_url = 'amqp://localhost:5673'
    this.connection = await amqp.connect(amqp_url)
  }

  async close(): Promise<void> {
    await this.connection.close()
  }

  async on(exchangeName: string, queueName: string, callback: Function): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertExchange(exchangeName, "direct", { durable: true })

    await channel.assertQueue(queueName, { durable: true })
    await channel.bindQueue(queueName, exchangeName, "")
    await channel.consume(queueName, async function(msg: any) {
      await callback(msg.content.toString())
      channel.ack(msg)
    })
  }

  async publish(exchangeName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertExchange(exchangeName, "direct", { durable: true })
    channel.publish(exchangeName, "", Buffer.from(JSON.stringify(data)))
  }
}