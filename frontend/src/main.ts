import { createApp, provide } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/AxiosAdapter'
import CatalogHttpGateway from './gateways/CatalogHttpGateway'
import CheckoutHttpGateway from './gateways/CheckoutHttpGateway'


const app = createApp(App).mount('#app')
const httpClient = new AxiosAdapter()
const catalogGateway = new CatalogHttpGateway(httpClient, 'http://localhost:3002')
const checkoutGateway = new CheckoutHttpGateway(httpClient, 'http://localhost:3000')

app.provide("catalogGateway", catalogGateway)
app.provide("checkoutGateway", checkoutGateway)
app.mount("#app")