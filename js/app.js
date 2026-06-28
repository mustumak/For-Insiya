document.addEventListener(
"DOMContentLoaded",
()=>{

particlesJS(
"particles-js",
{
particles:{
number:{value:90},
color:{value:["#ff7e5f","#feb47b","#ff6b9d","#c471ed","#f8d57e"]},
size:{value:3,random:true},
move:{speed:1.2},
opacity:{value:0.7,random:true}
}
}
)

const scenes=[

{
type:"Hello"
},

{
type:"timer"
},

{
type:"question",

title:"Choose One",

text:

"Chocolate or Me?",

options:[

{
label:"Chocolate 🍫",

feedback:

"But what if I bring chocolates?",

correct:false
},

{
label:"You 🙂",

feedback:

"I'll get you loads of 🍫🍫🍫",

correct:true
}

]

},

{
type:"question",

title:"Be Honest",

text:

"Ice-cream or ice-cream with me?",

options:[

{
label:"Ice-cream 🍦",

feedback:"🥺\nplease?",

correct:false
},

{
label:"Ice-cream with Me 🙂",

feedback:"Good answer 🙂",

correct:true
}

]

},

{
type:"question",

title:"Pick One",

text:

"Date night or day out?",

options:[

{
label:"Date Night 🌙",

feedback:"But we will do both ❤️",

correct:true
},

{
label:"Day Out ☀️",

feedback:"But we will do both ❤️",

correct:true
}

]

},

{
type:"question",

title:"Choose Carefully",

text:

"Which describes you?",

options:[

{
label:"Cute",

feedback:"Closer 🙂",

correct:false
},

{
label:"Super Cute",

feedback:"Correct 🙂",

correct:true
}

]

},

{
type:"timeline"
},

{
type:"envelope"
}

]

const app=
document.getElementById(
"app"
)

const music=
document.getElementById(
"music"
)

let current=0

function startMusic(){
music.play().catch(()=>{})
document.removeEventListener("click",startMusic)
document.removeEventListener("touchstart",startMusic)
}

document.addEventListener("click",startMusic)
document.addEventListener("touchstart",startMusic)

const images=(window.imageManifest||[])
.map(f=>"./assets/images/"+f)

const envelopeIdx=scenes.findIndex(s=>s.type==="envelope")
scenes.splice(envelopeIdx,0,...images.map(img=>({type:"memory",image:img})))

render()

function next(){

gsap.to(

".scene",

{

opacity:0,

scale:.9,

duration:.45,

onComplete:()=>{

current++

if(
current>=scenes.length
){

current=0

}

render()

}

}

)

}

function updateProgress(){

document
.getElementById(
"bar"
)
.style.width=

((current+1)
/scenes.length)
*100+"%"

}

function feedback(txt){

const div=
document.createElement(
"div"
)

div.className=
"feedback"

div.innerHTML=
txt.replaceAll("\n","<br>")

document
.querySelector(
".scene"
)
.appendChild(div)

setTimeout(
()=>div.remove(),
1800
)

}

function render(){

updateProgress()

app.innerHTML=""

const s=
scenes[current]

const scene=
document.createElement(
"div"
)

scene.className=
"scene"

app.appendChild(
scene
)

if(
s.type==="timer"
){

scene.innerHTML=`
<div class="timerWord" id="typed"></div>
<div class="timerRing">
  <svg viewBox="0 0 100 100">
    <defs>
      <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#c471ed"/>
        <stop offset="50%" style="stop-color:#f64f59"/>
        <stop offset="100%" style="stop-color:#f0a500"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="44" class="timerTrack"/>
    <circle cx="50" cy="50" r="44" class="timerArc" id="timerArc"/>
  </svg>
</div>
`

new Typed(
"#typed",
{
strings:["Overthinking..."],
typeSpeed:60,
showCursor:true
}
)

const arc=document.getElementById("timerArc")
const circumference=2*Math.PI*44
arc.style.strokeDasharray=circumference
arc.style.strokeDashoffset=0

let elapsed=0
const interval=setInterval(()=>{
elapsed+=100
const progress=elapsed/5000
arc.style.strokeDashoffset=circumference*progress
if(elapsed>=5000){
clearInterval(interval)
next()
}
},100)

}

else if(
s.type==="hello"||s.type==="Hello"
){

scene.innerHTML=`

<div class="helloFlowers">🌸 🌼 🌸</div>

<div class="bigTitle helloTitle">
Hi Insiya
</div>

<div class="text helloSub">
Something small.<br>Made just for you.
</div>

<button id="startBtn">
Begin ✨
</button>

`

scene
.querySelector(
"#startBtn"
)
.onclick=next

}

else if(
s.type==="question"
){

scene.innerHTML=`

<div class="bigTitle">

${s.title}

</div>

<div class="text">

${s.text}

</div>

<div class="options">

</div>

`

const options=
scene.querySelector(
".options"
)

s.options.forEach(
o=>{

const b=
document.createElement(
"button"
)

b.innerText=
o.label

b.onclick=()=>{

feedback(
o.feedback
)

if(
o.correct
){

spawn()

setTimeout(
next,
1200
)

}

}

options.appendChild(
b
)

})

}

else if(
s.type==="timeline"
){

scene.innerHTML=`
<div class="tlLabel">Our Story till now...</div>
<div class="tlSlot" id="tlSlot"></div>
<button id="tlBtn" style="opacity:0;pointer-events:none">Continue</button>
`

const points=[
"14 Aug 2025 🗓️",
"First Meet ☕",
"Then came Confusion 😕",
"Then more... 🌀",
"Then more... 🌀",
"Then came Trust 🤝",
"More Cafes. More desserts. More talks. ☕🍰💬",
"A bit more Trust 🌱",
"10 April 2026 ✨",
"The Nisbat ❤️"
]

const slot=document.getElementById("tlSlot")
const tlBtn=document.getElementById("tlBtn")
let idx=0

function showPoint(){
if(idx>=points.length){
gsap.to(tlBtn,{opacity:1,duration:.5})
tlBtn.style.pointerEvents="auto"
tlBtn.onclick=next
return
}
slot.textContent=points[idx]
gsap.fromTo(slot,
{opacity:0,y:20},
{opacity:1,y:0,duration:.6,ease:"power2.out",
onComplete:()=>{
setTimeout(()=>{
gsap.to(slot,{opacity:0,y:-20,duration:.5,ease:"power2.in",
onComplete:()=>{
idx++
setTimeout(showPoint,200)
}
})
},1600)
}
}
)
}

showPoint()

}

else if(
s.type==="memory"
){

scene.innerHTML=`
<div class="memory" style="background-image:url(${s.image})">
<div class="overlay">
<div class="memLabel">Memories 🌸</div>
<button>Continue</button>
</div>
</div>
`

scene
.querySelector(
"button"
)
.onclick=
next

}

else{

scene.innerHTML=`

<div class="envelope">

✉️

</div>

<div class="text">

Tap Envelope

</div>

`

scene
.querySelector(
".envelope"
)
.onclick=()=>{

scene.innerHTML=`

<div class="bigTitle">

So...

</div>

<div
class="text">

Can we continue

making new memories?

</div>

<div class="yesNoWrap">

<button id="yes">YES</button>

<div class="noContainer">
<button id="no" class="noBtn">NO</button>
</div>

</div>

`

const no=
document.getElementById(
"no"
)

let count=0

function dodgeNo(){

count++

const wrap=no.parentElement
const bw=no.offsetWidth||120
const bh=no.offsetHeight||52
const maxL=Math.max(0,wrap.offsetWidth-bw-8)
const maxT=Math.max(0,wrap.offsetHeight-bh-8)

no.style.transform="none"
no.style.left=Math.round(Math.random()*maxL)+"px"
no.style.top=Math.round(Math.random()*maxT)+"px"

if(count>4){
no.innerText="Fine YES"
}

}

no.onclick=(e)=>{
e.stopPropagation()
if(no.innerText==="Fine YES"){
document.getElementById("yes").click()
}else{
dodgeNo()
}
}

document
.getElementById(
"yes"
)
.onclick=()=>{

scene.innerHTML=`

<div class="helloFlowers">🌸 🌸 🌸</div>

<div class="bigTitle helloTitle">
Thank You ❤️
</div>

<div class="text" style="line-height:2">
For the trust.<br>
For the conversations.<br>
For being you.<br><br>
This story has a good person in it.<br>
And I am glad that person is you.
</div>

`

}

}

}

gsap.from(

scene,

{

opacity:0,

y:50,

duration:.8

}

)

}

function spawn(){

for(
let i=0;
i<10;
i++
){

const s=
document.createElement(
"div"
)

s.innerHTML="✨"

s.style.position=
"fixed"

s.style.left=
Math.random()*100+"vw"

s.style.top=
Math.random()*100+"vh"

document.body.appendChild(
s
)

gsap.to(

s,

{

y:-120,

opacity:0,

duration:2,

onComplete:()=>s.remove()

}

)

}

}

}
)
