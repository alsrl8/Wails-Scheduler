import React, {useEffect, useState} from 'react';
import plusIcon from "../../assets/images/plus.png";
import plusIconHover from "../../assets/images/plus_hover.png"
import "./AddButton.css";
import AddModal from "../add_modal/AddModal";

interface AddButtonProps {
    loadCards: () => void;
}

const AddButton = (props: AddButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lastKeyPress, setLastKeyPress] = useState<{ key: string; time: number }>({key: '', time: 0});

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const now = Date.now();
            const timeBetweenPresses = now - lastKeyPress.time;

            if (event.key.toUpperCase() === 'A' && lastKeyPress.key === 'A' && timeBetweenPresses <= 500) {
                if (isModalOpen) return;
                setIsModalOpen(true);
                setLastKeyPress({key: '', time: 0});
            } else {
                // Update last key press
                setLastKeyPress({key: event.key.toUpperCase(), time: now});
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lastKeyPress]);


    return (
        <div className="add-button-container">
            <img
                className="add-button"
                src={plusIcon} alt="Add Icon"
            />
            <img
                className="add-button add-button-hover"
                src={plusIconHover}
                onClick={() => setIsModalOpen(true)}
                alt="Add Icon"
            />
            <AddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadCards={props.loadCards}
            />
        </div>);

};


export default AddButton;