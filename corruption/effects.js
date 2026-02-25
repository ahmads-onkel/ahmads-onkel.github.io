function applyVisualCorruption(ctx, canvas) {
    if (Math.random() < getVisualGlitchChance()) {

        let sliceHeight = Math.random() * 20 + 5;
        let y = Math.random() * canvas.height;

        let imageData = ctx.getImageData(0, y, canvas.width, sliceHeight);
        ctx.putImageData(imageData, Math.random() * 10 - 5, y);
    }

    if (corruptionLevel > 80 && Math.random() < 0.05) {
        ctx.fillStyle = "rgba(255,0,0,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
