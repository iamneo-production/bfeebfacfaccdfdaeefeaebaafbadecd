document.addEventListener("DOMContentLoaded", function () {
    let breakLength = 5;
    let sessionLength = 25;
    let isSession = true;
    let isRunning = false;
    let timer;
    let audio = document.getElementById("beep");

    function updateDisplay() {
        document.getElementById("break-length").textContent = breakLength;
        document.getElementById("session-length").textContent = sessionLength;
        document.getElementById("time-left").textContent = formatTime(isSession ? sessionLength : breakLength * 60);
        document.getElementById("timer-label").textContent = isSession ? "Session" : "Break";
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainderSeconds.toString().padStart(2, "0")}`;
    }

    updateDisplay();

    document.getElementById("break-decrement").addEventListener("click", function () {
        if (breakLength > 1) {
            breakLength--;
            if (!isSession) updateDisplay();
        }
    });

    document.getElementById("break-increment").addEventListener("click", function () {
        if (breakLength < 60) {
            breakLength++;
            if (!isSession) updateDisplay();
        }
    });

    document.getElementById("session-decrement").addEventListener("click", function () {
        if (sessionLength > 1) {
            sessionLength--;
            if (isSession) updateDisplay();
        }
    });

    document.getElementById("session-increment").addEventListener("click", function () {
        if (sessionLength < 60) {
            sessionLength++;
            if (isSession) updateDisplay();
        }
    });

    document.getElementById("start_stop").addEventListener("click", function () {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
        } else {
            timer = setInterval(function () {
                if (sessionLength === 0 && breakLength === 0) {
                    clearInterval(timer);
                    audio.play();
                    isSession = true;
                    sessionLength = 25;
                    breakLength = 5;
                    updateDisplay();
                } else if (sessionLength === 0) {
                    audio.play();
                    isSession = false;
                    sessionLength = 0;
                    updateDisplay();
                } else {
                    sessionLength--;
                    updateDisplay();
                }
            }, 1000);
            isRunning = true;
        }
    });

    document.getElementById("reset").addEventListener("click", function () {
        clearInterval(timer);
        isRunning = false;
        audio.pause();
        audio.currentTime = 0;
        isSession = true;
        sessionLength = 25;
        breakLength = 5;
        updateDisplay();
    });
});
