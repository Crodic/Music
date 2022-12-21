var music = document.querySelector('.music')
var btnPlay = document.querySelector('.play')
var btnPrev = document.querySelector('.prev')
var btnNext = document.querySelector('.next')

var startMusic = document.querySelector('.start')
var endMusic = document.querySelector('.end')
var range = document.querySelector('.range')

var musicImage= document.querySelector('.music-img img')
var musicImgRotate = document.querySelector('.music-img')
var musicTitle = document.querySelector('.title')

var volumeUp =document.querySelector(".volume-up")
var volumeDown =document.querySelector(".volume-down")

volumeUp.addEventListener("click", function(){
    if(music.volume >= 1){
        music.volume = 1
    }else{
        music.volume += 0.05
        document.querySelector('.volume-down img').src = './img/volumeDown.png'
        console.log(music.volume)
    }
})

volumeDown.addEventListener("click",function(){
    if(music.volume <= 0.2){
        music.volume = 0
        document.querySelector('.volume-down img').src = './img/volumeX.jpg'
    }else{
        music.volume -= 0.05
        console.log(music.volume)
    }
})

var isInfi = false
var playInfi = document.querySelector(".play-infinite")
playInfi.addEventListener("click",function(){
    if(isInfi){
        isInfi=false
        playInfi.classList.remove('active')
    }else{
        isInfi=true
        playInfi.classList.add('active')
    }
})

var isRepeat = false;
var playRepeat= document.querySelector('.play-repeat')
playRepeat.addEventListener("click", function(){
    if(isRepeat){
        isRepeat=false
        playRepeat.classList.remove('active')
    }else{
        isRepeat=true
        playRepeat.classList.add('active')
    }
})

var isPlay = true
var indexMusic = 0

var listMusic =[
    {
        id: 1,
        name: 'Sword Art Online',
        source: './music/music1.mp3',
        image: './img/R.jpg'
    },
    {
        id: 2,
        name: 'Accel World',
        source: './music/music2.mp3',
        image: './img/X.jpg'
    },
    {
        id: 2,
        name: 'Re:Zero',
        source: './music/music3.mp3',
        image: './img/V.webp'
    }
]
var timer = setInterval(displayTimer,100)

music.addEventListener('ended',endedSong)
function endedSong(){
    if(isRepeat){
        isPlay=true
        playMusic()
    }else{
        changeMusic('next')
    }
    if(isInfi==true && indexMusic == 0){
        isPlay=false
        playMusic()
    }
}
function timeChange(){
    setInterval(changeColorImg,3000)
}
timeChange()
function changeColorImg(){
    change = setInterval(function(){
        musicImage.style.boxShadow = '0px 0px 100px #007CFF'
    },5000)
    musicImage.style.boxShadow = '0px 0px 100px #00DCFF'
}

//Nút play
btnPlay.addEventListener("click", playMusic)
function playMusic(){
    if(isPlay){
        music.play()
        musicImgRotate.classList.add('is-play')
        btnPlay.innerHTML='<i class="fa-solid fa-pause"></i>'
        isPlay= false
        timer = setInterval(displayTimer,500)
    }else{
        music.pause()
        musicImgRotate.classList.remove('is-play')
        btnPlay.innerHTML='<i class="fa-solid fa-play"></i>'
        isPlay=true
        clearInterval(timer)
    }
}


//Nút tiến lùi
btnNext.addEventListener("click", function(){
    changeMusic("next")
})
btnPrev.addEventListener("click", function(){
    changeMusic("prev")
})
function changeMusic(dir){
    if(dir==="next"){
        indexMusic++
        if(indexMusic >= listMusic.length){
            indexMusic = 0
        }
        isPlay = true
    }else if(dir === "prev"){
        indexMusic--
        if(indexMusic < 0){
            indexMusic = listMusic.length - 1
        }
        isPlay=true
    }
    init(indexMusic)
    playMusic()
}

//range 
function displayTimer(){
    var {duration, currentTime}= music //duration: tổng thời gian bài nhạc, currentTime: thời gian bài nhạc đã chạy
    
    endMusic.textContent = formatTimer(currentTime)
    range.max = duration
    range.value = currentTime

    if(!duration){
        startMusic.textContent='00:00'
    }else{
        startMusic.textContent=formatTimer(duration)
    }
}


function formatTimer(number){
    var minutes = Math.floor(number / 60)
    var seconds = Math.floor(number - minutes * 60)
    return `${minutes<10 ? '0'+minutes: minutes}:${seconds<10 ? '0'+seconds:seconds}`
}

range.addEventListener("change",moveRange)

function moveRange(){
    music.currentTime = range.value 
}

function init(indexMusic){
    music.setAttribute("src", listMusic[indexMusic].source)
    musicImage.setAttribute("src", listMusic[indexMusic].image)
    musicTitle.innerHTML = listMusic[indexMusic].name
    displayTimer()
}

init(indexMusic)

