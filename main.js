let song1, song2;
let scoreLeftWrist = 0;
let scoreRightWrist = 0;
let songStatus = "";
let leftWristY = 0;
let leftWristX = 0;
let rightWristY = 0;
let rightWristX = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    // Check if the left wrist score is above threshold and draw the circle
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if (!song1.isPlaying()) {
            song1.play();
            song1.setVolume(1);
            song1.rate(1);
            document.getElementById("song_name").innerHTML = "Playing: music.mp3";
        }
    }

    // Check if the right wrist score is above threshold and draw the circle
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (!song2.isPlaying()) {
            song2.play();
            song2.setVolume(1);
            song2.rate(1);
            document.getElementById("song_name").innerHTML = "Playing: music2.mp3";
        }
    }
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        // Get the score and coordinates of the left wrist
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX " + leftWristX + " leftWristY " + leftWristY);

        // Get the score and coordinates of the right wrist
        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX " + rightWristX + " rightWristY " + rightWristY);
    }
}
