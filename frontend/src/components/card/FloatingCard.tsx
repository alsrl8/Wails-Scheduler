import React, {useRef} from 'react';
import Draggable from 'react-draggable';
import './FloatingCard.css';

interface FloatingCardProps {
    children: React.ReactNode;
    ref: React.MutableRefObject<any>
}

const FloatingCard = (props: FloatingCardProps) => {
    const {children} = props;

    return (
        <Draggable>
            <div className="draggable-container">
                <div className="floating-card">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

export default FloatingCard;
