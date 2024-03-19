import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import './FloatingCard.css';


interface FloatingCardProps {
    children: React.ReactNode;
    onDrag: (e: DraggableEvent, data: DraggableData) => void;
}

const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>((props, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [bounds, setBounds] = useState({left: 0, top: 0, right: 0, bottom: 0});

    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const updateBounds = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            setBounds({top: 0, right: viewportWidth / 2, bottom: viewportHeight * 0.95, left: -viewportWidth / 2});
        };

        window.addEventListener('resize', updateBounds);
        updateBounds();

        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    return <Draggable nodeRef={internalRef}
                      onDrag={props.onDrag}
                      bounds={bounds}
                      onStart={() => setIsDragging(true)}
                      onStop={() => setIsDragging(false)}
    >
        <div className="draggable-container" ref={internalRef}>
            <div className={`floating-card ${isDragging ? 'no-animation' : ''}`}>
                {props.children}
            </div>
        </div>
    </Draggable>

});


export default FloatingCard;