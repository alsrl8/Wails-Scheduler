import React, {useState} from 'react';
import plusIcon from "../../assets/images/plus.png";
import plusIconHover from "../../assets/images/plus_hover.png"
import "./AddButton.css";

interface AddButtonProps {

}

const AddButton = (props: AddButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return <div className="add-button-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
    >
        <img className="add-button" src={plusIcon} alt="Add Icon"/>
        <img className="add-button add-button-hover" src={plusIconHover} alt="Add Icon"/>
    </div>

};


export default AddButton;