let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCounter = 1;

function startWatch() {
    if (!isRunning) {
        timer = setInterval(updateWatch, 1000);
        isRunning = true;
        document.querySelector('.start').disabled = true; // Disable start button
    }
}

function pauseWatch() {
    clearInterval(timer);
    isRunning = false;
    document.querySelector('.start').disabled = false; // Enable start button
}

function resetWatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    updateDisplay();
    clearLapList();
    document.querySelector('.start').disabled = false; // Enable start button
}

function recordLap() {
    if (!isRunning) {
        alert("Start the stopwatch to record laps.");
        return; // Prevent recording laps if not running
    }
    const lapTime = getFormattedTime();
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap-${lapCounter} : ${lapTime}`;
    document.getElementById('laplist').appendChild(lapItem);
    lapCounter++;
}

function updateWatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = getFormattedTime();
}

function getFormattedTime() {
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function clearLapList() {
    const laplist = document.getElementById('laplist');
    while (laplist.firstChild) {
        laplist.removeChild(laplist.firstChild);
    }
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}
