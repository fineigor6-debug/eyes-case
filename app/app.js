/* =========================
   BALANCE SYSTEM
========================= */

function getBalance(){

let balance = localStorage.getItem("balance")

if(balance === null){

balance = 100
localStorage.setItem("balance", balance)

}

return parseInt(balance)

}

function setBalance(value){

localStorage.setItem("balance", value)

updateBalanceUI()

}

function updateBalanceUI(){

const el = document.getElementById("balance")

if(el){

el.innerText = getBalance()

}

}

/* =========================
   CASE PRICE
========================= */

function payForCase(price){

let balance = getBalance()

if(balance < price){

alert("Недостаточно средств")

return false

}

balance -= price

setBalance(balance)

return true

}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

updateBalanceUI()

})
