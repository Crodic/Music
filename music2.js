var music = document.querySelector('.music')
var btnPlay = document.querySelector('.play')
var btnNext = document.querySelector('.next')
var btnPrev = document.querySelector('.prev')
var musicIsPlay = true
var indexMusic = 0

var listMusic = ['./music/music1.mp3','./music/music2.mp3','./music/music3.mp3']
music.setAttribute('src', listMusic[indexMusic])
btnPlay.addEventListener("click", playMusic)

function playMusic(){
    if(musicIsPlay){
        music.play()
        btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>'
        musicIsPlay = false
    }else{
        music.pause()
        btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>'
        musicIsPlay=true
    }
}

btnNext.addEventListener('click',function(){
    changeMusic('next')
})
btnPrev.addEventListener('click',function(){
    changeMusic('prev')
})

function changeMusic(directionMusic){
    if(directionMusic ==='next'){
        indexMusic++
        if(indexMusic>listMusic.length){
            indexMusic=0
        }
        musicIsPlay = true
    }else if(directionMusic==='prev'){
        indexMusic--
        if(indexMusic<0){
            indexMusic = listMusic.length - 1
        }
        musicIsPlay=true
    }
    music.setAttribute('src',listMusic[indexMusic])
    playMusic()
}