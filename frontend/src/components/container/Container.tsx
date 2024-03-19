import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import FloatingCard from "../card/FloatingCard";
import DropPoint from "../drop/DropPoint";

const Container = () => {
    const floatingCardRef = useRef<HTMLDivElement>(null);
    const dropPointRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState(false);

    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        if (!floatingCardRef.current || !dropPointRef.current) return;

        const dropPointRect = dropPointRef.current.getBoundingClientRect();
        const floatingCardRect = floatingCardRef.current.getBoundingClientRect();

        const isColliding = dropPointRect.left < floatingCardRect.right &&
            dropPointRect.right > floatingCardRect.left &&
            dropPointRect.top < floatingCardRect.bottom &&
            dropPointRect.bottom > floatingCardRect.top;

        setCollision(isColliding);
        if (isColliding) {
            console.log("Collision Detected!");
        }
    };

    useEffect(() => {
    }, [collision]);

    return (
        <div>
            <FloatingCard ref={floatingCardRef} onDrag={onDrag}>
                Drag Me
            </FloatingCard>
            <DropPoint ref={dropPointRef} />
        </div>
    );
};

export default Container;
