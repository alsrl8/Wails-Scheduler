import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
    markdownText: string;
}

const MarkdownViewer = (props: MarkdownViewerProps) => {
    return <ReactMarkdown>{props.markdownText}</ReactMarkdown>
}

export default MarkdownViewer;