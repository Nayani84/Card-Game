import React, { useState } from "react";
import './Card.css';

function Card({ image, alt, index }) {

    const [{ x, y, angle }] = useState({
        x: Math.random() * 80 - 40,
        y: Math.random() * 80 - 40,
        angle: Math.random() * 180 - 90,
    });

    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    return (
        <img
            className="Card"
            src={image}
            alt={alt}
            style={{ transform, zIndex: index }}
        />
    );
}

export default Card;