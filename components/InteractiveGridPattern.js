"use client";

import React, { useState } from "react";

/**
 * InteractiveGridPattern — ported from Magic UI.
 * Each square reacts to mouse hover individually.
 */
export function InteractiveGridPattern({
    width = 40,
    height = 40,
    squares = [24, 24],
    className = "",
    squaresClassName = "",
    ...props
}) {
    const [horizontal, vertical] = squares;
    const [hoveredSquare, setHoveredSquare] = useState(null);

    return (
        <svg
            width={width * horizontal}
            height={height * vertical}
            className={`absolute inset-0 h-full w-full ${className}`}
            {...props}
        >
            {Array.from({ length: horizontal * vertical }).map((_, index) => {
                const x = (index % horizontal) * width;
                const y = Math.floor(index / horizontal) * height;
                return (
                    <rect
                        key={index}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        className={`stroke-gray-400/20 transition-all duration-100 ease-in-out ${
                            hoveredSquare === index ? "fill-gray-500/20" : "fill-transparent"
                        } ${squaresClassName}`}
                        onMouseEnter={() => setHoveredSquare(index)}
                        onMouseLeave={() => setHoveredSquare(null)}
                    />
                );
            })}
        </svg>
    );
}
