import React, {useEffect, useRef, useState} from 'react';
import {DraggableData, DraggableEvent} from 'react-draggable';
import FloatingCard from "../floating_card/FloatingCard";
import DropPoint from "../drop/DropPoint";
import {GetSchedules} from "../../../wailsjs/go/main/App";
import Schedule from "../../models/Schedule";
import ScheduleComponent from "../schedule/ScheduleComponent";
import AddButton from "../add_button/AddButton";


const Container = () => {
    const floatingCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dropPointRef = useRef<HTMLDivElement>(null);
    const [isColliding, setIsColliding] = useState(false);
    const [bounds, setBounds] = useState({left: 0, top: 0, right: 0, bottom: 0});
    const [cards, setCards] = useState<Schedule []>([]);
    const [cardOrders, setCardOrders] = useState<string[]>([]);
    const [cardPositions, setCardPositions] = useState(new Map<string, { x: number, y: number }>());

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

    useEffect(() => {
        setCardOrders(cards.map(card => card.id))
    }, [cards]);

    const loadCards = () => {
        GetSchedules().then(setCards)
    }


    const onDrag = (e: DraggableEvent, data: DraggableData, index: number) => {
        if (!floatingCardRefs.current[index] || !dropPointRef.current) return;

        const dropPointRect = dropPointRef.current.getBoundingClientRect();
        const floatingCardRect = floatingCardRefs.current[index]!.getBoundingClientRect();

        const _isColliding = dropPointRect.left < floatingCardRect.right &&
            dropPointRect.right > floatingCardRect.left &&
            dropPointRect.top < floatingCardRect.bottom &&
            dropPointRect.bottom > floatingCardRect.top;

        setIsColliding(_isColliding);
        if (_isColliding) {
            console.log(`Collision Detected with card ${index + 1}!`);
        }
    };

    const removeCard = (cardId: string) => {
        setCards(cards.filter(card => card.id !== cardId));
    }

    const getCardRef = (index: number) => {
        if (!floatingCardRefs.current[index]) {
            floatingCardRefs.current[index] = null;
        }
        return (el: HTMLDivElement) => floatingCardRefs.current[index] = el;
    };

    return (
        <div>
            {cardOrders.map((cardId, index) => {
                const card = cards.find(card => card.id === cardId);
                if (!card) {
                    return <div key={`placeholder-${index}`} style={{visibility: 'hidden'}}>Placeholder</div>;
                }
                return <FloatingCard key={index}
                                     ref={getCardRef(index)}
                                     onDrag={(e, data) => onDrag(e, data, index)}
                                     bounds={bounds}
                                     isColliding={isColliding}
                                     removeCard={removeCard}
                                     cardId={card.id}
                                     setIsColliding={setIsColliding}
                                     cardPositions={cardPositions}
                >
                    <ScheduleComponent schedule={card}/>
                </FloatingCard>
            })}
            <DropPoint ref={dropPointRef} isColliding={isColliding}/>
            <AddButton loadCards={loadCards}/>
        </div>
    );
};

export default Container;
