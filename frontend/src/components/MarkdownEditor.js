import React, { useState } from "react";
import Editor from "../components/Editor";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "../styles/markdownEditor.css";

const MarkdownEditor = ({
    editorPlaceholder,
    editorRows,
    editorValue,
    editorSetValue,
    previewBg,
}) => {
    const [openPreview, setOpenPreview] = useState(false);

    return (
        <div className="markdown-editor">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button
                        type="button"
                        className={
                            !openPreview ? `nav-link active` : `nav-link`
                        }
                        onClick={() => setOpenPreview(false)}
                    >
                        Write
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        type="button"
                        className={openPreview ? `nav-link active` : `nav-link`}
                        onClick={() => setOpenPreview(true)}
                    >
                        Preview
                    </button>
                </li>
            </ul>

            {/* render editor */}
            {!openPreview && (
                <>
                    <Editor
                        placeholder={editorPlaceholder}
                        rows={editorRows}
                        value={editorValue}
                        setValue={editorSetValue}
                    />
                </>
            )}
            {/* render written Markdown Preview */}
            {openPreview && (
                <MarkdownRenderer content={editorValue} isWhiteBg={previewBg} />
            )}
        </div>
    );
};

export default MarkdownEditor;
