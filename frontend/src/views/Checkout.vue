<script setup lang="ts">
  import axios from "axios";
  import { reactive, onMounted, inject } from "vue";
  import CatalogGateway from './../gateways/CatalogGateway'
  import CheckoutGateway from './../gateways/CatalogGateway'
  
  const catalogGateway = new inject('catalogGateway') as CatalogGateway
  const checkoutGateway = new inject('checkoutGateway') as CheckoutGateway

  const state = reactive({
    items: [],
    order: {
      cpf: "317.153.361-86",
      orderItems: [],
      coupon: "",
    },
    total: 0,
    orders: []
  })

  function addItem(item: any) {
    const existingOrderItem = state.order.orderItems.find((orderItem: any) => orderItem.idItem === item.idItem)
    if(existingOrderItem) {
      existingOrderItem.quantity++
    } else {
      state.order.orderItems.push({ idItem: item.idItem, quantity: 1 })
    }

    preview(state.order)
  }

  function removeOrderItem(orderItem: any) {
    const existingOrderItem = state.order.orderItems.find((order: any) => order.idItem === orderItem.idItem)
    if(existingOrderItem) {
      existingOrderItem.quantity--
      if(existingOrderItem.quantity == 0) {
        state.order.orderItems.splice(state.order.orderItems.indexOf(existingOrderItem), 1)
      }
    }

    preview(state.order)
  }

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

    state.order = {
      cpf: "317.153.361-86",
      orderItems: [],
      coupon: "",
    }
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
    <button @click="addItem(item)">Add</button>
  </div>

  <label>cpf</label>
  <input type="text" v-model="state.order.cpf"/>

  <div v-for="orderItem in state.order.orderItems">
    {{orderItem.idItem}}
    {{orderItem.quantity}}
    <button @click="removeOrderItem(orderItem)">-</button>
  </div>

  <label>coupon</label>
  <input type="text" v-model="state.order.coupon" @blur="validateCoupon(state.order.coupon)"/>
  {{state.order}}
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
