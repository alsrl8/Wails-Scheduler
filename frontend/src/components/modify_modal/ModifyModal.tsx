import React from "react";
import {Button, Modal} from "antd";
import {ScheduleComponentProps} from "../schedule/ScheduleComponent";

interface ModifyModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const ModifyModal = (props: ModifyModalProps) => {
    const handleOk = () => {
        props.setIsModalOpen(false);
    }

    const handleCancel = () => {
        props.setIsModalOpen(false);
    }

    return (
        <Modal
            title="Modify shcedule information"
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
            여기에 내용을 넣어
        </Modal>
    );
}

export default ModifyModal;