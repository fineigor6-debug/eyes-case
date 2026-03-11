export function randomDrop(){

 const drops = [
  {name:"⭐ 5 Stars", chance:50},
  {name:"⭐ 10 Stars", chance:30},
  {name:"⭐ 25 Stars", chance:15},
  {name:"⭐ 100 Stars", chance:5}
 ]

 const random = Math.random()*100

 let sum = 0

 for(const drop of drops){

  sum += drop.chance

  if(random <= sum){
   return drop.name
  }

 }

 return drops[0].name
}
