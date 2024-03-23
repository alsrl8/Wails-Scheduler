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
    const [position, setPosition] = useState({x: 0, y: 0})

    useImperativeHandle(ref, () => internalRef.current!);

    return <Draggable nodeRef={internalRef}
                      onDrag={(e, data) => {
                          props.onDrag(e, data);
                          setPosition({x: data.x, y: data.y})
                      }}
                      bounds={props.bounds}
                      onStart={() => setIsDragging(true)}
                      onStop={() => setIsDragging(false)}
                      position={position}
                      defaultPosition={{x: 100, y:100}}
    >
        <div className="draggable-container" ref={internalRef}>
            <div className={`floating-card ${isDragging ? 'no-animation' : ''}`}>
                {props.children}
            </div>
        </div>
    </Draggable>

});


export default FloatingCard;