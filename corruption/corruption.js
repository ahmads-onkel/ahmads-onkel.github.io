let corruptionLevel = parseInt(localStorage.getItem("corruption")) || 0;
let restartCount = parseInt(localStorage.getItem("restarts")) || 0;

function increaseCorruption(amount) {
    corruptionLevel += amount;
    localStorage.setItem("corruption", corruptionLevel);
}

function registerRestart() {
    restartCount++;
    localStorage.setItem("restarts", restartCount);
    increaseCorruption(5);
}

function getControlInversionChance() {
    return Math.min(corruptionLevel * 0.002, 0.3);
}

function getVisualGlitchChance() {
    return Math.min(corruptionLevel * 0.003, 0.5);
}

function getMessage() {
    if (corruptionLevel < 20) return "Find the exit.";
    if (corruptionLevel < 50) return "Something feels wrong.";
    if (corruptionLevel < 100) return "Stop restarting.";
    return "It remembers you.";
}
