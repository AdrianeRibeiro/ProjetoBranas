import axios from "axios"

test.skip("Deve testar o calculteFreight pela API", async function() {
  const input = {
    orderItems: [
      { volume: 0.03, density: 100, quantity: 1 }
    ],
  }

  const response = await axios.post('http://localhost:3001/calculteFreight', input)
  const preview = response.data
  expect(preview.total).toBe(30)
})