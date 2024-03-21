import React, {useEffect, useRef, useState} from 'react';
import {DraggableData, DraggableEvent} from 'react-draggable';
import FloatingCard from "../card/FloatingCard";
import DropPoint from "../drop/DropPoint";

const Container = () => {
    const floatingCardRef = useRef<HTMLDivElement>(null);
    const dropPointRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState(false);
    const [bounds, setBounds] = useState({left: 0, top: 0, right: 0, bottom: 0});

    useEffect(() => {
        const updateBounds = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            setBounds({top: 0, right: viewportWidth, bottom: viewportHeight, left: -20});
        };

        window.addEventListener('resize', updateBounds);
        updateBounds();

        return () => window.removeEventListener('resize', updateBounds);
    }, []);


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
            <FloatingCard ref={floatingCardRef} onDrag={onDrag} bounds={bounds}>
                Drag Me 1
            </FloatingCard>
            <FloatingCard ref={floatingCardRef} onDrag={onDrag} bounds={bounds}>
                Drag Me 2
            </FloatingCard>
            <FloatingCard ref={floatingCardRef} onDrag={onDrag} bounds={bounds}>
                Drag Me 3
            </FloatingCard>
            <FloatingCard ref={floatingCardRef} onDrag={onDrag} bounds={bounds}>
                Drag Me 4
            </FloatingCard>
            <DropPoint ref={dropPointRef}/>
        </div>
    );
};

export default Container;
