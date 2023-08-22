function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        leftWristX = Math.floor(results[0].pose.leftWrist.x);
        leftWristY = Math.floor(results[0].pose.leftWrist.y);
        console.log("leftWristX = " + leftWristX + "  leftWristY = " + leftWristY);
        rightWristX = Math.floor(results[0].pose.rightWrist.x);
        rightWristY = Math.floor(results[0].pose.rightWrist.y);
        console.log("rightWristX = " + rightWristX + "  rightWristY = " + rightWristY);
        score_leftWrist = results[0].pose.keypoints[9].score
        console.log("Score (Left) = " + score_leftWrist)
        score_rightWrist = results[0].pose.keypoints[10].score
        console.log("Score (Left) = " + score_rightWrist)
    }
}
function modelLoaded(){
    console.log('PoseNet is initialized.');
}
function draw(){
    image(video,0,0,600,500);
    if (score_leftWrist > 0.2) {
        fill("red");
        stroke("red");
        circle(leftWristX, leftWristY, 14);
        left = Number(leftWristY)
        volume = left/500
        song.setVolume(volume)
        document.getElementById("vol").innerHTML = "VOLUME: " + volume 
    }
    if (score_rightWrist > 0.2) {
        fill("red")
        stroke("red")
        circle(rightWristX, rightWristY, 14)
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "SPEED: 0.5X"
            song.rate(0.5)
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "SPEED: 1.0X"
            song.rate(1.0)
        }
        if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "SPEED: 1.5X"
            song.rate(1.5)
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "SPEED: 2.0X"
            song.rate(2.0)
        }
        if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "SPEED: 2.5X"
            song.rate(2.5)
        }
}}
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}