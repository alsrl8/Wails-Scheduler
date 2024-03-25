import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Button, Input, InputRef, Modal} from "antd";
import {AddSchedule} from "../../../wailsjs/go/main/App";
import Schedule from "../../models/Schedule";
import MarkdownEditor from "../markdown_editor/MarkdownEditor";
import './AddModal.css'

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
        const userInputSchedule: Schedule = {id: '', name: nameInputValue, desc: descInputValue};
        AddSchedule(userInputSchedule).then(() => {
            setNameInputValue('');
            setDescInputValue('');
            props.loadCards();
        });
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
        setNameInputValue('');
        setDescInputValue('');
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
            <MarkdownEditor
                inputRef={inputRef}
                header={nameInputValue}
                setHeader={setNameInputValue}
                content={descInputValue}
                setContent={setDescInputValue}
                handleOk={handleOk}
            />
        </Modal>
    </>

};


export default AddModal;