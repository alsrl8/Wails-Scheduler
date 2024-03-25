import React, {RefObject} from "react";
import ReactMarkdown from "react-markdown";
import {Input, InputRef} from "antd";
import './MarkdownEditor.css'

interface MarkdownEditorProps {
    inputRef: RefObject<InputRef>;
    header: string;
    setHeader: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
    handleOk: () => void;
}

const MarkdownEditor = (props: MarkdownEditorProps) => {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setHeader(event.target.value);
    }
    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setContent(event.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            props.handleOk();
        }
    }

    const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            props.handleOk();
        }
    }

    return (
        <div className="markdown-editor">
            <Input
                ref={props.inputRef}
                className="input"
                value={props.header}
                onChange={handleNameChange}
                onKeyDown={handleInputKeyDown}
            />
            <Input.TextArea
                className="markdown-input"
                value={props.content}
                onChange={handleDescChange}
                placeholder="Enter Markdown here..."
                autoSize={{minRows: 4, maxRows: 8}}
                onKeyDown={handleTextAreaKeyDown}
            />
            <div className="markdown-preview">
                <ReactMarkdown>{'## ' + props.header + '\n' + props.content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default MarkdownEditor;