import React, {forwardRef} from 'react';
import "./DropPoint.css"
import trashCan from '../../assets/images/trashcan.png';

interface DropPointProps {
    isColliding: boolean,
}

const DropPoint = forwardRef<HTMLDivElement, DropPointProps>((props, ref) => {

    return (
        <div className={`drop-point ${props.isColliding ? 'collision' : ''}`} ref={ref}>
            <img className={`trashcan ${props.isColliding ? 'collision' : ''}`} src={trashCan} alt="Trash Can"/>
        </div>
    );
});

export default DropPoint;
