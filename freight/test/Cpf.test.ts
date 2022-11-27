import Cpf from "../src/domain/entity/Cpf"

test("Deve validar o cpf válido que tem dígito maior que 0", function() {
  const cpf = new Cpf("259.556.978-37")
  expect(cpf).toBeDefined()
})

test("Deve validar o cpf com dígito zero no primeiro dígito", function() {
  const cpf = new Cpf("198.454.187-08")
  expect(cpf).toBeDefined()
})

test("Deve validar o cpf com dígito zero no segundo dígito", function() {
  const cpf = new Cpf("198.454.187-08")
  expect(cpf).toBeDefined()
})

test("Deve tentar validar o cpf com mais de 14 caracteres", function() {
  expect(() => new Cpf("085.454.437.600")).toThrow(new Error("CPF inválido"))
})

const cpfsWithSameDigit = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33"
]

test.each(cpfsWithSameDigit)("Deve tentar validar o cpf com dígitos iguais", function(cpf) {
  expect(() => new Cpf(cpf)).toThrow(new Error("CPF inválido"))
})

test("Deve tentar validar o cpf com letras", function() {
  expect(() => new Cpf("Aaaa")).toThrow(new Error("CPF inválido"))
})