/* =========================
   BALANCE SYSTEM
========================= */

function getBalance(){
    let balance = localStorage.getItem("balance")

    if(balance === null){
        balance = 100
        localStorage.setItem("balance", balance)
    }

    return parseFloat(balance)
}

function setBalance(value){
    localStorage.setItem("balance", value.toFixed(2))
    updateBalanceUI()
}

function addBalance(amount){
    let balance = getBalance()
    balance += amount
    setBalance(balance)
}

function removeBalance(amount){
    let balance = getBalance()

    if(balance < amount){
        showNotice("Недостаточно TON")
        return false
    }

    balance -= amount
    setBalance(balance)
    return true
}

function updateBalanceUI(){
    const el = document.getElementById("balance")
    if(el){
        el.innerText = getBalance().toFixed(2)
    }
}


/* =========================
   CASE / BET PAYMENT
========================= */

function payForCase(price){
    return removeBalance(price)
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
   CRASH HISTORY
========================= */

function getCrashHistory(){
    return JSON.parse(localStorage.getItem("crash_history")) || []
}

function addCrashHistory(mult){
    let history = getCrashHistory()

    history.push(mult)

    if(history.length > 15){
        history.shift()
    }

    localStorage.setItem("crash_history", JSON.stringify(history))
}

function renderCrashHistory(){

    const historyDiv = document.getElementById("history")
    if(!historyDiv) return

    const history = getCrashHistory()

    historyDiv.innerHTML = ""

    history.slice().reverse().forEach(h => {

        const div = document.createElement("div")
        div.className = "history-item"

        if(h < 2) div.classList.add("h-red")
        else if(h < 5) div.classList.add("h-orange")
        else div.classList.add("h-green")

        div.innerText = h.toFixed(2) + "x"
        historyDiv.appendChild(div)

    })
}


/* =========================
   STATS SYSTEM
========================= */

function getStats(){
    return JSON.parse(localStorage.getItem("stats")) || {
        games:0,
        won:0,
        lost:0,
        profit:0
    }
}

function saveStats(stats){
    localStorage.setItem("stats", JSON.stringify(stats))
}

function addGameStat(winAmount, bet){

    let stats = getStats()

    stats.games++

    if(winAmount > 0){
        stats.won++
        stats.profit += (winAmount - bet)
    }else{
        stats.lost++
        stats.profit -= bet
    }

    saveStats(stats)
}


/* =========================
   RANDOM CRASH GENERATOR
========================= */

function generateCrashPoint(){
    return Math.pow(1 - Math.random(), -1.2)
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    updateBalanceUI()
    renderCrashHistory()

})
