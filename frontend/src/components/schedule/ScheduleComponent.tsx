import React, {useEffect, useState} from 'react';
import Schedule from '../../models/Schedule';
import './ScheduleComponent.css'
import MarkdownViewer from "../markdown_viewer/MarkdownViewer";
import ModifyModal from "../modify_modal/ModifyModal";

export interface ScheduleComponentProps {
    schedule: Schedule;
    isCardActive: boolean;
    setIsCardActive: (value: boolean) => void;
    loadCards: () => void;
}

const ScheduleComponent = (props: ScheduleComponentProps) => {
    const [isActive, setIsActive] = useState(false);
    const cardStyles = `card ${isActive ? 'cardActive' : ''}`;
    const [isOpenModal, setIsOpenModal] = useState(false);

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

    const handleDoubleClick = () => {
        setIsOpenModal(true);
        props.setIsCardActive(false);
    }

    const handleMouseDown = () => {
        if (!props.isCardActive) return;
        setIsActive(true);
    }

    const handleMouseUp = () => {
        setIsActive(false);
    }

    return (<>
            <div
                className={cardStyles}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
            >
                <MarkdownViewer className="cardTitle" markdownText={"# " + props.schedule.name}/>
                <hr className="divisionLine"/>
                <MarkdownViewer className="cardDesc" markdownText={props.schedule.desc}/>
                <ModifyModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                    scheduleId={props.schedule.id}
                    name={props.schedule.name}
                    desc={props.schedule.desc}
                    onClose={() => props.setIsCardActive(true)}
                    loadCards={props.loadCards}
                />
            </div>
        </>
    );
};

export default ScheduleComponent;