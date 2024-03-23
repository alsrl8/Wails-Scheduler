import React, {useEffect, useRef, useState} from 'react';
import {DraggableData, DraggableEvent} from 'react-draggable';
import FloatingCard from "../floating_card/FloatingCard";
import DropPoint from "../drop/DropPoint";

const Container = () => {
    const floatingCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dropPointRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState(false);
    const [bounds, setBounds] = useState({left: 0, top: 0, right: 0, bottom: 0});
    const [cards, setCards] = useState<number[]>([]);

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

    useEffect(() => {
        loadCards()
    }, []);

    const loadCards = () => {
        setCards([1, 2, 3])
    }

    const onDrag = (e: DraggableEvent, data: DraggableData, index: number) => {
        if (!floatingCardRefs.current[index] || !dropPointRef.current) return;
        
        const dropPointRect = dropPointRef.current.getBoundingClientRect();
        const floatingCardRect = floatingCardRefs.current[index]!.getBoundingClientRect();

        const isColliding = dropPointRect.left < floatingCardRect.right &&
            dropPointRect.right > floatingCardRect.left &&
            dropPointRect.top < floatingCardRect.bottom &&
            dropPointRect.bottom > floatingCardRect.top;

        setCollision(isColliding);
        if (isColliding) {
            console.log(`Collision Detected with card ${index + 1}!`);
        }
    };

    useEffect(() => {
    }, [collision]);

    const getCardRef = (index: number) => {
        if (!floatingCardRefs.current[index]) {
            floatingCardRefs.current[index] = null;
        }
        return (el: HTMLDivElement) => floatingCardRefs.current[index] = el;
    };

    const floatingCards = cards.map((card, index) => (
        <FloatingCard key={index} ref={getCardRef(index)} onDrag={(e, data) => onDrag(e, data, index)} bounds={bounds}>
            {`Card ${card}`}
        </FloatingCard>
    ));

    return (
        <div>
            {floatingCards}
            <DropPoint ref={dropPointRef}/>
        </div>
    );
};

export default Container;
