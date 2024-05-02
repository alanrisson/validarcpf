let cpf = '04998892070'

function Cpf(cpf){

    this.cpfString = cpf
}

Cpf.prototype.valido = function(){

    Object.defineProperty(this, 'validacao', {
        enumerable:false,
        writable: true,
        configurable: false,
        value: this.validar()
    })

    if(this.validacao.next().value) {

        this.cpfArray = this.cpfString.split('')
        this.digito1 = Number(this.cpfArray.slice(-2, -1))
        this.digito2 = Number(this.cpfArray.slice(-1))

        this.somar()   
    } else {
        throw new Error('CPF inválido')
    }

    if(this.validacao.next().value){
        this.somar(this.digito1)
    } else{
        throw new Error('CPF inválido')
    }

    if(this.validacao.next().value){
        this.finaliza()
    } else {
        throw new Error('CPF inválido')
    }
}

Cpf.prototype.somar = function(dig){

    Object.defineProperty(this, 'soma',{
        value: 0,
        writable: true,
        enumerable: true
    })

    Object.defineProperty(this, 'cpfNumber',{
        enumerable: true,
        configurable: true,
        get: function(){
            return this.cpfArray.map(valor => Number(valor)).slice(0, (this.cpfArray.length - 2))
        },
        set: function(val){
            if(val) val
        }
    });

    this.cpfNumber = dig != undefined? this.cpfArray.splice(9,0,dig) : false

    this.cpfNumber.reduce((ac, valor) => {

        this.soma = this.soma + (ac*valor)
        ac--
        return ac
    }, this.cpfNumber.length+1)

    this.verificador = 11 - (this.soma % 11) > 9? 0 : 11 - (this.soma % 11)
}

Cpf.prototype.validar = function*(){

    if(typeof(this.cpfString) == 'string') {
        this.cpfString = cpf.replace(/\D+/g,'')
        if (this.cpfString.length == 11) {
            let sequencia = this.cpfString[0].repeat(11);  
            sequencia == this.cpfString? yield false: yield true
        }   
    } else {
        yield false
    }
 
    if(this.verificador == this.digito1) {
        yield true
    } else {
        yield false
    }

    if(this.verificador == this.digito2) {
        yield true
    } else {
        yield false
    }

}

Cpf.prototype.finaliza = function(){
    console.log('CPF Valido')
}

const cpf1 = new Cpf(cpf)
cpf1.valido()
