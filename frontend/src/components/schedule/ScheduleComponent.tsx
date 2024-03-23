import React, {useEffect, useState} from 'react';
import Schedule from '../../models/Schedule';
import './ScheduleComponent.css'

interface Props {
    schedule: Schedule;
}

const ScheduleComponent: React.FC<Props> = ({schedule}) => {
    const [isActive, setIsActive] = useState(false);
    const cardStyles = `card ${isActive ? 'cardActive' : ''}`;

    useEffect(() => {
        const handleMouseLeaveWindow = (event: MouseEvent) => {
            if (!event.relatedTarget) {
                setIsActive(false);
            }
        };

        const handleMouseUp =(event: MouseEvent) => {
            setIsActive(false);
        }

        document.addEventListener('mouseout', handleMouseLeaveWindow);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseout', handleMouseLeaveWindow);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className={cardStyles} onMouseDown={() => setIsActive(true)} onMouseUp={() => setIsActive(false)}>
            <h1 className="cardTitle">{schedule.name}</h1>
            <p className="cardDesc">{schedule.desc}</p>
        </div>
    );
};

export default ScheduleComponent;
