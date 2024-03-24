import React, {ChangeEvent, LegacyRef, useEffect, useRef, useState} from 'react';
import {Button, Input, InputRef, Modal} from "antd";
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
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (props.isModalOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus({
                    cursor: 'start',
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [props.isModalOpen]);

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
        setNameInputValue('');
        setDescInputValue('');
    };

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInputValue(e.target.value);
    }

    const handleDescInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescInputValue(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleOk();
        }
    };

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
            <Input
                ref={inputRef}
                value={nameInputValue}
                onChange={handleNameInputChange}
                onKeyPress={handleKeyDown}
                placeholder={'Input Name'}
            />
            <Input
                value={descInputValue}
                onChange={handleDescInputChange}
                onKeyPress={handleKeyDown}
                placeholder={'Input Desc'}
            />
        </Modal>
    </>

};


export default AddModal;