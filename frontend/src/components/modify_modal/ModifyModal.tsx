import React, {useEffect, useRef, useState} from "react";
import {Button, InputRef, Modal} from "antd";
import MarkdownEditor from "../markdown_editor/MarkdownEditor";

interface ModifyModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    scheduleId: string;
    name: string;
    desc: string;
}

const ModifyModal = (props: ModifyModalProps) => {
    const [nameInputValue, setNameInputValue] = useState(props.name);
    const [descInputValue, setDescInputValue] = useState(props.desc);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (props.isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus({
                    cursor: 'start',
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [props.isOpen]);
    const handleOk = () => {
        props.setIsOpen(false);
    }

    const handleCancel = () => {
        props.setIsOpen(false);
    }

    return <Modal
        open={props.isOpen}
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
}

export default ModifyModal;
