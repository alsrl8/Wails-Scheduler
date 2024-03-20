import React, {forwardRef} from 'react';
import "./DropPoint.css"

interface DropPointProps {
}

const DropPoint = forwardRef<HTMLDivElement, DropPointProps>((props, ref) => {
    return (
        <div className="drop-point" ref={ref}>
            Drop Here
        </div>
    );
});

export default DropPoint;
