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
   NOTIFICATION SYSTEM
========================= */

function showNotice(text){

let notice = document.getElementById("appNotice")

if(!notice){

notice = document.createElement("div")

notice.id = "appNotice"

notice.style.position = "fixed"
notice.style.bottom = "90px"
notice.style.left = "50%"
notice.style.transform = "translateX(-50%)"

notice.style.background = "#111"
notice.style.border = "1px solid #ff2b2b"
notice.style.color = "#fff"

notice.style.padding = "12px 18px"
notice.style.borderRadius = "10px"

notice.style.fontSize = "14px"
notice.style.boxShadow = "0 0 15px rgba(255,0,0,0.5)"

notice.style.zIndex = "9999"

notice.style.opacity = "0"
notice.style.transition = "0.3s"

document.body.appendChild(notice)

}

notice.innerText = text

notice.style.opacity = "1"

setTimeout(()=>{

notice.style.opacity = "0"

},2000)

}


/* =========================
   CASE PRICE
========================= */

function payForCase(price){

let balance = getBalance()

if(balance < price){

showNotice("Недостаточно валюты")

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
