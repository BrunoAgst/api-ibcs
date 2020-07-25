module.exports = (email, password) => {
    if(email == undefined 
        || email == "" 
        || email == " "
        || email == null
    ){
        return "Email inválido";
    }

    if(password == undefined 
        || password == "" 
        || password == " "
        || password == null
    ){
        return "Senha inválida";
    }

    return
};