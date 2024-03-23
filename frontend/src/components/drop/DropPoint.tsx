import React, {forwardRef} from 'react';
import "./DropPoint.css"

interface DropPointProps {
    isColliding: boolean,
}

const DropPoint = forwardRef<HTMLDivElement, DropPointProps>((props, ref) => {

    return (
        <div className={`drop-point ${props.isColliding ? 'collision' : ''}`} ref={ref}>
            Drop Here
        </div>
    );
});

export default DropPoint;
