import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
    className: string;
    markdownText: string;
}

const MarkdownViewer = (props: MarkdownViewerProps) => {
    return <ReactMarkdown className={props.className}>{props.markdownText}</ReactMarkdown>
}

export default MarkdownViewer;