import React from "react";

const Editor = ({ placeholder, rows, value, setValue }) => {
    return (
        <textarea
            // to capture new line
            style={{ whiteSpace: "pre-wrap" }}
            type="textarea"
            className="form-control"
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        ></textarea>
    );
};

export default Editor;
