module.exports = (field) => {
    if(typeof(field) === "string" && field.length <= 50 && field !== ""){
        return true;
    }else{
        return false;
    }
}