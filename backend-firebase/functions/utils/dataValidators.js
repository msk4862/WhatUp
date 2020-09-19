// data validations
const isEmpty = (string) => {
    if (string.trim() === "") return true;
    return false;
};

const isDefined = (data) => {
    return data !== undefined; 
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(emailRegEx)) return true;
    return false;
};

exports.validateSignupData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) errors.email = "Must not be empty!";
    else if (!isEmail(data.email)) errors.email = "Must be valid!";

    if (isEmpty(data.password)) errors.password = "Must not be empty!";
    else if (data.password !== data.confirmPassword)
        errors.password = "Passwords must match!";

    if (isEmpty(data.email)) errors.handle = "Must not be empty!";

    return Object.keys(errors).length == 0
        ? { valid: true, errors }
        : { valid: false, errors };
};

exports.cleanEditUserData = (data) => {
    const {bio, website, location} = data;

    cleanData = {};
    if(isDefined(bio) && !isEmpty(bio)) cleanData.bio = bio;
    if(isDefined(website) && !isEmpty(website)) cleanData.website = website;
    if(isDefined(location) && !isEmpty(location)) cleanData.location = location;

    return cleanData;
}