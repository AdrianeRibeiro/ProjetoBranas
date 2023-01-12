<script setup lang="ts">
  import axios from "axios";
  import { reactive, onMounted, inject } from "vue";
  import CatalogGateway from './../gateways/CatalogGateway'
  import CheckoutGateway from './../gateways/CatalogGateway'
  import Order from '../entities/Order'
  import Observer from '../entities/Observer'

  const state = reactive({
    items: [],
    order: new Order("317.153.361-86"),
    total: 0,
    orders: []
  })

  const catalogGateway = new inject('catalogGateway') as CatalogGateway
  const checkoutGateway = new inject('checkoutGateway') as CheckoutGateway

  state.order.register(new Observer("addItem", function () {
	  preview(state.order);
  }));

  state.order.register(new Observer("removeOrderItem", function () {
	  preview(state.order);
  }));

  async function validateCoupon(coupon: string) {
    state.order.coupon = ""
    const isValid = await checkoutGateway.validateCoupon(coupon)
    
    if (isValid) {
      state.order.coupon = coupon
    }
    preview(state.order)
  }

  async function preview(order: any) {
    state.total = await checkoutGateway.preview(order)
  }

  async function checkout(order: any) {
    await checkoutGateway.checkout(order)

    state.order = new Order("317.153.361-86")
  }

  async function getOrdersByCpf(cpf: string) {
    state.orders = await checkoutGateway.getOrdersByCpf(cpf)
  } 

  onMounted(async () => {
    state.items = await catalogGateway.getItems()
  })
</script>

<template>
  <div v-for="item in state.items">
    {{item.description}}
    {{item.price}}
    <button @click="state.order.addItem(item)">Add</button>
  </div>

  <label>cpf</label>
  <input type="text" v-model="state.order.cpf"/>

  <div v-for="orderItem in state.order.orderItems">
    {{orderItem.idItem}}
    {{orderItem.quantity}}
    <button @click="state.order.removeOrderItem(orderItem)">-</button>
  </div>

  <label>coupon</label>
  <input type="text" v-model="state.order.coupon" @blur="validateCoupon(state.order.coupon)"/>
  {{state.total}}
  <button @click="checkout(state.order)">Checkout</button>
  <hr>
  <button @click="getOrdersByCpf(state.order.cpf)">Get orders</button>

  <div v-for="order in state.orders">
    {{order}}
  </div>
</template>

<style scoped>
</style>
