import React, {useState} from 'react';
import plusIcon from "../../assets/images/plus.png";
import plusIconHover from "../../assets/images/plus_hover.png"
import "./AddButton.css";
import {Button, Modal} from "antd";

interface AddButtonProps {

}

const AddButton = (props: AddButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <div className="add-button-container">
        <img className="add-button" src={plusIcon} alt="Add Icon"/>
        <img className="add-button add-button-hover" src={plusIconHover} onClick={showModal} alt="Add Icon"/>
        <Modal
            title="Title"
            open={isModalOpen}
            onOk={handleOk}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    OK
                </Button>,
            ]}
            onCancel={() => setIsModalOpen(false)}
            closable={false}
        >
            <p>Modal content can go here.</p>
        </Modal>
    </div>

};


export default AddButton;