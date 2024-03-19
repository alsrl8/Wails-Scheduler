import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Draggable from 'react-draggable';
import './FloatingCard.css';

interface FloatingCardProps {
    children: React.ReactNode;
}

const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>((props, forwardedRef) => {
    const {children} = props;
    const [bounds, setBounds] = useState({left: 0, top: 0, right: 0, bottom: 0});
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(forwardedRef, () => internalRef.current!);

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

    return (
        <Draggable nodeRef={internalRef} bounds={bounds}>
            <div className="draggable-container" ref={internalRef}>
                <div className="floating-card">
                    {children}
                </div>
            </div>
        </Draggable>
    );
});

export default FloatingCard;
