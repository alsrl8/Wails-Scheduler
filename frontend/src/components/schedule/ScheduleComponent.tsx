import React, {useEffect, useState} from 'react';
import Schedule from '../../models/Schedule';
import './ScheduleComponent.css'
import MarkdownViewer from "../markdown_viewer/MarkdownViewer";

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

        const handleMouseUp = (event: MouseEvent) => {
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
            <MarkdownViewer className="cardTitle" markdownText={"# " + schedule.name}/>
            <hr className="divisionLine" />
            <MarkdownViewer className="cardDesc" markdownText={schedule.desc}/>
        </div>
    );
};

export default ScheduleComponent;
