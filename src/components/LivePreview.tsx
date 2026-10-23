import { useRef, useEffect, useCallback } from 'react';

interface LivePreviewProps {
  fps: number;
  creatures: number;
  compact?: boolean;
}

export default function LivePreview({ fps, creatures, compact = false }: LivePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Dark game-like background
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, w, h);

    // Simulate game floor tiles
    const tileSize = 32;
    for (let x = 0; x < w; x += tileSize) {
      for (let y = 0; y < h; y += tileSize) {
        const brightness = 15 + Math.sin((x + y + frameRef.current) * 0.01) * 5;
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 5})`;
        ctx.fillRect(x, y, tileSize - 1, tileSize - 1);
      }
    }

    // Simulate player character (center)
    const px = w / 2;
    const py = h / 2;
    ctx.fillStyle = '#89b4fa';
    ctx.fillRect(px - 12, py - 12, 24, 24);
    ctx.fillStyle = '#cdd6f4';
    ctx.fillRect(px - 8, py - 8, 16, 16);

    // Simulate creatures (bounding boxes)
    const creaturePositions = [
      { x: px - 120, y: py - 80, w: 40, h: 40, name: 'Dragon Lord' },
      { x: px + 80, y: py + 40, w: 36, h: 36, name: 'Dragon' },
      { x: px - 60, y: py + 100, w: 32, h: 32, name: 'Demon' },
    ];

    const visibleCreatures = creaturePositions.slice(0, creatures);
    
    visibleCreatures.forEach((c, i) => {
      const offsetX = Math.sin(frameRef.current * 0.02 + i) * 5;
      const offsetY = Math.cos(frameRef.current * 0.015 + i) * 3;
      
      // Creature body
      ctx.fillStyle = '#f38ba8';
      ctx.fillRect(c.x + offsetX, c.y + offsetY, c.w, c.h);
      
      // Red bounding box
      ctx.strokeStyle = '#f38ba8';
      ctx.lineWidth = 2;
      ctx.strokeRect(c.x + offsetX - 4, c.y + offsetY - 4, c.w + 8, c.h + 8);
      
      // Label
      ctx.fillStyle = '#f38ba8';
      ctx.font = '10px monospace';
      ctx.fillText(c.name, c.x + offsetX - 4, c.y + offsetY - 8);
    });

    // Battle list overlay (green boxes on the side)
    ctx.strokeStyle = '#a6e3a1';
    ctx.lineWidth = 1;
    for (let i = 0; i < Math.min(creatures, 4); i++) {
      const bx = w - 160;
      const by = 20 + i * 30;
      ctx.strokeRect(bx, by, 140, 24);
      ctx.fillStyle = '#a6e3a1';
      ctx.font = '10px monospace';
      ctx.fillText(`Creature ${i + 1}`, bx + 5, by + 16);
    }

    // Radar minimap overlay (top-right)
    ctx.strokeStyle = '#89b4fa';
    ctx.lineWidth = 1;
    ctx.strokeRect(w - 170, h - 130, 160, 120);
    ctx.fillStyle = '#89b4fa22';
    ctx.fillRect(w - 170, h - 130, 160, 120);
    ctx.fillStyle = '#89b4fa';
    ctx.font = '9px monospace';
    ctx.fillText('RADAR', w - 165, h - 118);
    
    // Player dot on radar
    ctx.fillStyle = '#89b4fa';
    ctx.beginPath();
    ctx.arc(w - 90, h - 70, 3, 0, Math.PI * 2);
    ctx.fill();

    // FPS counter
    ctx.fillStyle = '#a6e3a1';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`${fps} FPS`, 10, 25);
    
    // Resolution
    ctx.fillStyle = '#6c7086';
    ctx.font = '10px monospace';
    ctx.fillText('1920x1080 → 960x540', 10, 42);

    frameRef.current++;
  }, [fps, creatures]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, [draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = 1920 / canvas.width;
    const scaleY = 1080 / canvas.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);
    console.log(`Pixel click: (${x}, ${y})`);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={compact ? 640 : 960}
        height={compact ? 360 : 540}
        className="w-full rounded-lg border border-border cursor-crosshair"
        onClick={handleClick}
      />
      <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-success font-mono">
        LIVE
      </div>
    </div>
  );
}
