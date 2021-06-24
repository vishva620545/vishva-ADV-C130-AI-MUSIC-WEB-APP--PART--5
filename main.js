song="";
music="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;

song_status="";
music_status="";

function preload()
{
    song=loadSound("52 Gaj Ka Daman - Renuka Panwar 128 Kbps.mp3");
    music=loadSound("Naach Meri Rani - Guru Randhawa.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.console('pose',gotposes);
}

function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist="+scoreleftwrist);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log(" rightwristx="+ rightwristx+"rightwristy="+rightwristy);
    }
}

function modelLoaded()
{
  console.log('model is Loaded');
}

function draw()
{
    image(video,0,0,600,500);
    song_status=song.isPlaying();
    music_status=music.isPlaying();
    fill("#e6005c");
    stroke("#000000");
    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        song.stop();
        if(music_status==false)
        {
            music.play();
            document.getElementById(song).innerHTML="playingNaach Meri Rani"
        }
    }

    if(scorerightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
        music.stop();
        if(song_status==false)
        {
            song.play();
            document.getElementById(song).innerHTML="playing52 Gaj Ka Daman"
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}