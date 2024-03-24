import React, {ChangeEvent, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {AddSchedule} from "../../../wailsjs/go/main/App";
import Schedule from "../../models/Schedule";

interface AddModalProps {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void;
    loadCards: () => void;
}

const AddModal = (props: AddModalProps) => {
    const [nameInputValue, setNameInputValue] = useState('');
    const [descInputValue, setDescInputValue] = useState('');

    const handleOk = () => {
        props.setIsModalOpen(false);
        const userInputSchedule: Schedule = {id: '', name: nameInputValue, desc: descInputValue};
        AddSchedule(userInputSchedule).then(() => {
            setNameInputValue('');
            setDescInputValue('');
            props.loadCards();
        });
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInputValue(e.target.value);
    }

    const handleDescInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescInputValue(e.target.value);
    }

    return <>
        <Modal
            title="Input your schedule information"
            open={props.isModalOpen}
            onOk={handleOk}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    OK
                </Button>,
            ]}
            onCancel={handleCancel}
            closable={false}
        >
            <Input value={nameInputValue} onChange={handleNameInputChange} placeholder={'Input Name'}/>
            <Input value={descInputValue} onChange={handleDescInputChange} placeholder={'Input Desc'}/>
        </Modal>
    </>

};


export default AddModal;