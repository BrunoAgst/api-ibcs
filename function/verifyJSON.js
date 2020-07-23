const requiredF = require('./requiredField');
const notRequiredF = require('./notRequiredField');

module.exports = async function verifyJSON(body){
    var name, email, phone, store, work, description, facebook, instagram;
    try{
        name = await requiredF(body.name);
        email = await requiredF(body.email);
        phone = await requiredF(body.phone);
        store = await notRequiredF(body.store, 80);
        work =  await notRequiredF(body.work, 80);
        description =  await notRequiredF(body.description, 250);
        facebook = await notRequiredF(body.facebook, 50);
        instagram = await notRequiredF(body.instagram, 50);

        if(name == true 
            && email == true 
            && phone == true 
            && store == true 
            && work == true
            && description == true
            && facebook == true
            && instagram == true
        ){
            return true;
        }
    }catch(err){
        return false;
    }
};