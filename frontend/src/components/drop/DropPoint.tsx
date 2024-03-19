import React, {forwardRef} from 'react';

interface DropPointProps {
}

const DropPoint = forwardRef<HTMLDivElement, DropPointProps>((props, ref) => {
    return (
        <div className="drop-zone" ref={ref}>
            Drop Here
        </div>
    );
});

export default DropPoint;
