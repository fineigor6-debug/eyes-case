const tg = window.Telegram.WebApp
tg.expand()

const avatar = document.getElementById("avatar")
const name = document.getElementById("name")
const opened = document.getElementById("opened")

function goHome(){
window.location.href = "index.html"
}

/* TELEGRAM USER */

const user = tg.initDataUnsafe?.user

if(user){

name.innerText = user.first_name + (user.username ? " @" + user.username : "")

if(user.photo_url){
avatar.src = user.photo_url
}

}

/* OPENED CASES */

opened.textContent = localStorage.getItem("openedCases") || 0


/* =========================
   TESTER BALANCE
========================= */

function openBalanceTester(){

document
.getElementById("testerPopup")
.classList
.add("active")

}

function closeTester(){

document
.getElementById("testerPopup")
.classList
.remove("active")

}

function giveTestBalance(){

const input = document.getElementById("testerAmount")

let value = parseInt(input.value)

if(!value || value < 1){

showNotice("Введите сумму")
return

}

if(value > 100){

showNotice("Максимум 100")
return

}

let balance = getBalance()

balance += value

setBalance(balance)

showNotice("Выдано +" + value)

closeTester()

input.value = ""

}
