<script setup lang="ts">
  defineProps(["order", "total"])
  defineEmits(["validateCoupon", "checkout"])
</script>

<template>
  <label>cpf</label>
  <input type="text" v-model="order.cpf"/>

  <div v-for="orderItem in order.orderItems">
    {{orderItem.idItem}} {{orderItem.quantity}}
    <button @click="order.removeOrderItem(orderItem)">-</button>
  </div>

  <label>coupon</label>
  <input type="text" v-model="order.coupon" @blur="$emit('validateCoupon', order.coupon)"/>

  {{total}}
  <button @click="$emit('checkout', order)">Checkout</button>
</template>