document.addEventListener('DOMContentLoaded', function() {
    const songCards = document.querySelectorAll('.card-song'); 
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const playerImg = document.querySelector('.playing-song .image');
    const audio = new Audio(); 
    const musicPlayerImg=document.querySelector('.music-player .playing-song .image');
    const currTime=document.querySelector('.curr-time');
    const songDuration=document.querySelector('.tot-time');
    let progressBar=document.querySelector('.bar');
    const stopBtn=document.querySelector('.stopBtn');
    let isPlaying=false;
    const backBtn=document.querySelector('.backBtn');
    const forwardBtn=document.querySelector('.forwardBtn');
    let currentIndex=0;
    const home=document.getElementById('home');
    const mainContent=document.querySelector('.main-content');
    


    const songsList = [
        { title:"Mostly Melody", src:"images/songs/MostlyMelody.mp3", location:"images/MostlyMelody.jpeg", artist:"Brylie Oxley" },
        { title:"A Gentle Fog Descends", src:"images/songs/AGentleFogDescends.mp3", location:"images/MostlyMelody.jpeg", artist:"Brylie Oxley" },
        { title:"A Most Joyous Occasion", src:"images/songs/AMostJoyousOccasion.mp3", location:"images/MostlyMelody.jpeg", artist:"Brylie Oxley" },
        {title:"Back In To The Toxic",src:"images/songs/BackInToTheToxic.mp3",location:"images/JCBL.jpeg", artist:"Joint C Beat Laboratory"},
        {title:"Blooming Poison",src:"images/songs/BloomingPoison.mp3",location:"images/JCBL-2.jpeg", artist:"Joint C Beat Laboratory"},
        {title:"Delete",src:"images/songs/Delete.mp3",location:"images/JCBL.jpeg", artist:"Joint C Beat Laboratory"}
    ];

    songCards.forEach((card,index)=>{
        card.addEventListener('click',()=>loadSong(index,card));
    });

    function loadSong(index,card){
        const currentSong = songsList[index]; 

            if(card){
                const titleElement = card.querySelector('.card-title');
                if (titleElement && songTitle) songTitle.innerText = titleElement.innerText;

                const artistElement = card.querySelector('.card-info');
                if (artistElement && songArtist) songArtist.innerText = artistElement.innerText;

                const cardImage = card.querySelector('.card-image');
                if (cardImage && playerImg) playerImg.src = cardImage.src;

            }else{
                songTitle.innerText=currentSong.title;
                songArtist.innerText=currentSong.artist || "";
                playerImg.src=currentSong.location;
            }
            
            // play the audio
            audio.src = currentSong.src;
            audio.play();

            musicPlayerImg.src=currentSong.location;
            currentIndex=index;
    }

    stopBtn.addEventListener('click',()=>{
        if(isPlaying){
            audio.pause();
        }
        else{
            audio.play();
        }
    });

    forwardBtn.addEventListener('click',()=>{
        currentIndex=(currentIndex+1)%songsList.length;
        loadSong(currentIndex,null);
    });

    backBtn.addEventListener('click',()=>{
        currentIndex=(currentIndex-1+songsList.length)%songsList.length;
        loadSong(currentIndex,null);
    });
    

    audio.addEventListener('timeupdate',()=>{
        if(audio.duration){
            progressBar.value=(audio.currentTime/audio.duration)*100;
        }
        if(audio.currentTime){
            let secondsComp=((Math.floor(audio.currentTime))%60);
            let minutesComp=Math.floor((Math.floor(audio.currentTime))/60);
            let completedTime=`${minutesComp}:${secondsComp.toString().padStart(2, "0")}`;
            currTime.innerText=completedTime;
        }
    });

    audio.addEventListener('play',()=>{isPlaying=true;});
            audio.addEventListener('pause',()=>{isPlaying=false;});
            audio.addEventListener('ended',()=>{isPlaying=true;});

            audio.addEventListener("loadedmetadata", () => {
                let totalSeconds = Math.floor(audio.duration);
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
            
                let totalTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
                songDuration.innerText = totalTime;


            });

    home.addEventListener('click',()=>{
        mainContent.scrollTo({
            top:0,
            behavior:"smooth",
        });
        
    });




});
