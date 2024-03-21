import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import './FloatingCard.css';


interface FloatingCardProps {
    children: React.ReactNode;
    onDrag: (e: DraggableEvent, data: DraggableData) => void;
    bounds: { left: number, top: number, right: number, bottom: number };
}

const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>((props, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useImperativeHandle(ref, () => internalRef.current!);

    return <Draggable nodeRef={internalRef}
                      onDrag={props.onDrag}
                      bounds={props.bounds}
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