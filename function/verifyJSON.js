const requiredF = require('./requiredField');
const notRequiredF = require('./notRequiredField');

module.exports = async function verifyJSON(body){
    try{
        var name = await requiredF(body.name);
        var email = await requiredF(body.email);
        var phone = await requiredF(body.phone);
        var store = await notRequiredF(body.store, 80);
        var work =  await notRequiredF(body.work, 80);
        var description =  await notRequiredF(body.description, 250);
        var address = await notRequiredF(body.address, 100);
        var facebook = await notRequiredF(body.facebook, 50);
        var instagram = await notRequiredF(body.instagram, 50);

        if(name == true 
            && email == true 
            && phone == true 
            && store == true 
            && work == true
            && description == true
            && address == true
            && facebook == true
            && instagram == true
        ){
            return true;
        }
    }catch(err){
        return false;
    }
};