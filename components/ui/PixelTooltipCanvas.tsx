"use client";

import { useEffect, useRef } from "react";

export function PixelTooltipCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let mouseX = -1000;
        let mouseY = -1000;
        let lastMoveTime = 0;
        let animationFrameId: number;

        // Grid configuration
        const blockSize = 40; // Size of each pixel block
        const gap = 1; // Gap between blocks
        const decayRate = 0.05; // How fast the light fades
        const grid: { opacity: number }[][] = [];

        // Resize handler
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initGrid();
        };

        // Initialize grid state
        const initGrid = () => {
            const cols = Math.ceil(canvas.width / blockSize);
            const rows = Math.ceil(canvas.height / blockSize);
            grid.length = 0; // Clear existing

            for (let i = 0; i < cols; i++) {
                grid[i] = [];
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = { opacity: 0 };
                }
            }
        };

        // Interaction handler
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            lastMoveTime = Date.now();
        };

        const onMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        // Animation Loop
        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Light up blocks near cursor ONLY if moving recently (differentiates idle vs moving)
            const isMoving = Date.now() - lastMoveTime < 100;

            if (isMoving) {
                const colIndex = Math.floor(mouseX / blockSize);
                const rowIndex = Math.floor(mouseY / blockSize);

                // Add "energy" to the block under cursor and neighbors
                if (grid[colIndex] && grid[colIndex][rowIndex]) {
                    grid[colIndex][rowIndex].opacity = 1;

                    // Optional: Light up neighbors for a larger brush
                    const neighbors = [
                        [0, 1], [1, 0], [0, -1], [-1, 0]
                    ];
                    neighbors.forEach(([dx, dy]) => {
                        if (grid[colIndex + dx] && grid[colIndex + dx][rowIndex + dy]) {
                            grid[colIndex + dx][rowIndex + dy].opacity = Math.max(grid[colIndex + dx][rowIndex + dy].opacity, 0.5);
                        }
                    });
                }
            }

            // Draw and decay
            const cols = grid.length;
            if (cols === 0) return;
            const rows = grid[0].length;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const block = grid[i][j];

                    // Decay opacity
                    if (block.opacity > 0) {
                        block.opacity -= decayRate;
                        if (block.opacity < 0) block.opacity = 0;

                        // Draw block - Faded White
                        ctx.fillStyle = `rgba(255, 255, 255, ${block.opacity * 0.15})`;
                        ctx.fillRect(
                            i * blockSize,
                            j * blockSize,
                            blockSize - gap,
                            blockSize - gap
                        );

                        // Draw border for structure
                        ctx.strokeStyle = `rgba(255, 255, 255, ${block.opacity * 0.1})`;
                        ctx.strokeRect(
                            i * blockSize,
                            j * blockSize,
                            blockSize - gap,
                            blockSize - gap
                        );
                    } else {
                        // Draw faint idle grid (optional, for "texture")
                        ctx.fillStyle = `rgba(255, 255, 255, 0.015)`;
                        ctx.fillRect(
                            i * blockSize,
                            j * blockSize,
                            blockSize - gap,
                            blockSize - gap
                        );
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Setup
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove); // Listen to window to catch movement over other elements
        // canvas.addEventListener("mouseleave", onMouseLeave); // Window doesn't leave, but we can check bounds if needed, or just let it run. 
        // Actually, let's keep it simple: if mouse is outside canvas rect, logic handles it.
        // But we might want to reset if mouse leaves the window.
        document.addEventListener("mouseleave", onMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
