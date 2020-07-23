module.exports = async (field, total) => { 
    if(field === "" || field === null){
        return true;
    }
    else if(typeof(field) === "string" && field.length <= total){
        return true;
    }
    else{
        return false;
    }
}