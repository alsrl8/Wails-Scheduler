import React from "react";
import {Modal} from "antd";

interface ModifyModalProps {
    isOpen: boolean;
}

const ModifyModal = (props: ModifyModalProps) => {
    return <Modal open={props.isOpen}>hello world!</Modal>
}

export default ModifyModal;
