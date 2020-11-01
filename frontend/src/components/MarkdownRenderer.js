import Markdown from "markdown-to-jsx";
import React from "react";

const MarkdownRenderer = ({ content, isWhiteBg }) => {
    const renderMarkdown = () => {
        if (content && content !== "") {
            return <Markdown children={content} />;
        } else {
            return <p>Nothing to preview</p>;
        }
    };

    const renderBgStyles = () => {
        return {
            backgroundColor: "#fff",
            padding: "1rem",
        };
    };

    return (
        <div style={isWhiteBg ? renderBgStyles() : null}>
            {renderMarkdown()}
        </div>
    );
};

export default MarkdownRenderer;
