export default class Cpf {

  constructor(readonly value: string) {
    console.log('value', value)
    if(!this.validate(value)) throw new Error("CPF inválido")
    this.value = value
  }

  private validate (cpf: string) {
    if (!cpf) return false
    cpf = this.sanitizeCpf(cpf)
  
    if (!this.validLength(cpf)) return false
    if (this.allDigitsEqual(cpf)) return false
  
    const dg1 = this.calculateDigit(cpf, 10)
    const dg2 = this.calculateDigit(cpf, 11)
  
    const checkDigit = this.extractDigit(cpf) 
    const calculatedDigit = `${dg1}${dg2}`
    return checkDigit == calculatedDigit
  }
  
  private sanitizeCpf(cpf: string) {
    return cpf.replace(/\D/g,"")
  }
  
  private validLength(cpf: string) {
    return cpf.length === 11
  }

  private allDigitsEqual(cpf: string) {
    const [firstDigit] = cpf
    return cpf.split("").every(digit => digit === firstDigit)
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0
    for(const digit of cpf) {
        if(factor > 1) total += parseInt(digit) * factor--
    }
  
    const rest = total % 11
    
    return (rest < 2) ? 0 : 11 - rest
  }

  private extractDigit(cpf: string) {
    return cpf.slice(9)
  } 
}