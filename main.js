dino="";
harry_potter="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1_status="";
song2_status="";

function preload(){
    dino=loadSound("jurrasic park theme.mp3");
    harry_potter=loadSound("harry_potter.mp3");
}function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length >0){
        console.log(results);
        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = "+ leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = "+ rightWristY);
    }
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw(){
    image(video,0,0,600,500);
    song1_status=dino.isPlaying();
    song2_status=harry_potter.isPlaying();


    fill("#FF0000");
    stroke("#0000FF");

if(scoreLeftWrist > 0.05){
    circle(leftWristX, leftWristY, 20);

    harry_potter.stop();
    if(song1_status == false){
        dino.play();
        document.getElementById("song").innerHTML="Song = Jurrasic Park";
        dino.setVolume(2.5);
    }
}
if(scoreRightWrist > 0.05){
    circle(rightWristX, rightWristY, 20);

    dino.stop();
    if(song2_status == false){
        harry_potter.play();
        document.getElementById("song").innerHTML="Song = Harry Potter";
        harry_potter.setVolume(0.5)
;    }
}
}
