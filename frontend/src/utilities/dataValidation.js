export const isBlank = (data) => {
    if(data.trim() === "") return true;
    return false;
}

export const isEmptyObj = (obj) => {
    if(Object.keys(obj).length === 0) return true;
    return false;
}

export const isUrl = (url) => {
    return url.startsWith("https://") && 
            url.split(".")[url.split(".").length-1].length > 0;
}