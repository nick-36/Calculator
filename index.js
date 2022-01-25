const number_btn = document.querySelectorAll('[data-number]');
const operation_btn = document.querySelectorAll('[data-operation]');
const allClear_btn = document.querySelector('[data-allClear]');
const Delete_btn  = document.querySelector('[data-delete]');
const equal_btn = document.querySelector('[data-equal]');
const previousOperandTextElement= document.querySelector('[data-previous-operand]');
const currentOpearandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandTextElement,currentOpearandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOpearandTextElement = currentOpearandTextElement;
        this.allClear()
    }

    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    Delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendNumber(number){
        if(isNaN(this.currentOperand))return

        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(isNaN(this.currentOperand))return


        if(this.previousOperand !==''){
            this.compute()
            console.log(this.currentOperand);
            console.log(this.previousOperand);
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
       
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev))return

        switch(this.operation){
            case '+':
                computation = prev + curr;
                break
            case '-':
                computation = prev - curr;
                break
            case '×':
                computation = prev * curr;
                break
            case '÷':
                switch(curr){
                    case 0:
                        computation = 'BRUH!!'
                        break
                    default:
                         computation = prev / curr;

                }
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation =undefined;
        this.previousOperand = '';

    }

    updateDisplay(){
        this.currentOpearandTextElement.innerText =this.currentOperand;
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const calculator = new Calculator(previousOperandTextElement,currentOpearandTextElement);

number_btn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
        

    })
})


operation_btn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
        
        

    })
});


allClear_btn.addEventListener('click',()=>{
    calculator.allClear();
    calculator.updateDisplay();
})

Delete_btn.addEventListener('click',()=>{
    calculator.Delete();
    calculator.updateDisplay();
})

equal_btn.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})