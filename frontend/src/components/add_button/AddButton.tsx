import React, {useState} from 'react';
import plusIcon from "../../assets/images/plus.png";
import plusIconHover from "../../assets/images/plus_hover.png"
import "./AddButton.css";
import AddModal from "../add_modal/AddModal";

interface AddButtonProps {
    loadCards: () => void;
}

const AddButton = (props: AddButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


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