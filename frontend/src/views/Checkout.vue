<script setup lang="ts">
  import axios from "axios";
  import { reactive, onMounted, inject } from "vue";
  import ItemComponent from "../components/ItemComponent.vue"
  import OrderComponent from "../components/OrderComponent.vue"
  import CatalogGateway from './../gateways/CatalogGateway'
  import CheckoutGateway from './../gateways/CatalogGateway'
  import Order from '../entities/Order'
  import Observer from '../entities/Observer'

  const state = reactive({
    items: [] as Item[],
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
    <ItemComponent :item="item" @add="(item) => state.order.addItem(item)"></ItemComponent>
  </div>

  <OrderComponent 
    :order="state.order" 
    :total="state.total" 
    @validate-coupon="(code) => validateCoupon(code)"
    @checkout="(order) => checkout(order)"
  ></OrderComponent>

  <hr>

  <button @click="getOrdersByCpf(state.order.cpf)">Get orders</button>
  <div v-for="order in state.orders">
    {{order}}
  </div>
</template>

<style scoped>
</style>
