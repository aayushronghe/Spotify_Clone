let audioElement= new Audio("./songs/1.mp3");
// audioElement.play();
let presentIndex=-1;
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let songItems=Array.from(document.getElementsByClassName("songItem"));
let songs=[
    {songName:"It's Always Blue",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Cartel",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"They Mad",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Plug Walk",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Song Title",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Safety Dance",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"}];


$('#masterPlay').click(function(){
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        $(".songInfo img").css("opacity",1);
        $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-pause");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove("fa-circle-play");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add("fa-circle-pause");
    }
    else
    {
        audioElement.pause();
        $(".songInfo img").css("opacity",0);
        $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-play");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove("fa-circle-pause");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add("fa-circle-play");
    }
});

audioElement.addEventListener("timeupdate",()=>{
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

const makeAllPlays=()=>
{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");   
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        if(presentIndex!=songIndex)
        {
            audioElement.src=`songs/${songIndex+1}.mp3`;
            $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-pause");  
            $(".songInfo img").css("opacity",1);
            $(".songNamebottom").text(songs[songIndex].songName);    
            audioElement.currentTime=0;
            audioElement.play();
            presentIndex=songIndex;
        }
        else
        {
            if(audioElement.paused)
            {
                audioElement.play();
                $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-pause");  
                $(".songInfo img").css("opacity",1);
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");

            }
            else
            {
                audioElement.pause();
                $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-play");  
                $(".songInfo img").css("opacity",0);
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");
            }
        }
        
    })
})

$(".fa-backward-step").click(function(){
    makeAllPlays();
    presentIndex=songIndex-1;
    if(presentIndex<=0)
    {
        presentIndex=5;
    }
    if(songIndex<=0)
    {
        songIndex=5;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-pause");  
    $(".songInfo img").css("opacity",1);
    $(".songNamebottom").text(songs[songIndex].songName);    
    audioElement.currentTime=0;
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove("fa-circle-play");
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add("fa-circle-pause");
    audioElement.play();
})

$(".fa-step-forward").click(function(){
    makeAllPlays();
    presentIndex=songIndex+1;
    if(presentIndex>=5)
    {
        presentIndex=0;
    }
    if(songIndex>=5)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    $("#masterPlay").attr("class","fa-regular fa-3x fa-circle-pause");  
    $(".songInfo img").css("opacity",1);
    $(".songNamebottom").text(songs[songIndex].songName);    
    audioElement.currentTime=0;
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove("fa-circle-play");
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add("fa-circle-pause");
    audioElement.play();
})