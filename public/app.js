const API="https://late-term-2712.fineigor6.workers.dev"

let tg=null
let user=null

if(window.Telegram){

tg=window.Telegram.WebApp
tg.expand()

if(tg.initDataUnsafe){
user=tg.initDataUnsafe.user
}

}

async function register(){

if(!user)return

await fetch(API+"/api/register",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({

id:user.id,
name:user.first_name

})

})

}

async function loadPlayer(){

if(!user)return

const r=await fetch(API+"/api/player",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({

id:user.id

})

})

const data=await r.json()

const balance=document.getElementById("balance")

if(balance){
balance.innerText="Баланс ⭐ "+data.balance
}

}

async function openCase(){

const r=await fetch(API+"/api/open-case",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({

id:user.id

})

})

const data=await r.json()

alert("Выпало: "+data.item)

loadPlayer()

}

function goHome(){
window.location.href="index.html"
}

function openCases(){
window.location.href="cases.html"
}

function openInventory(){
window.location.href="inventory.html"
}

function openProfile(){
window.location.href="profile.html"
}

async function adminGive(){

const id=document.getElementById("adminId").value
const amount=document.getElementById("adminAmount").value

await fetch(API+"/api/add-balance",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({

id:id,
amount:amount

})

})

alert("готово")

}

register()
loadPlayer()
