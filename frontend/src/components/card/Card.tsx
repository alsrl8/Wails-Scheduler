import Draggable from "react-draggable";
import React from "react";

interface CardProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Card = (props: CardProps) => {
    const {children, onClick} = props;
    let drag = false;

    return (
        <Draggable
            onStart={() => {
                drag = false
            }}
            onDrag={() => {
                drag = true
            }}
            onStop={() => {
                if (!drag) onClick();
            }}
        >
            <div className="card">
                {children}
            </div>
        </Draggable>
    );
};