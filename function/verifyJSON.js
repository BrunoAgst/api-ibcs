const requiredF = require('./requiredField');
const notRequiredF = require('./notRequiredField');

module.exports = async function verifyJSON(data){
    try{
        var name = await requiredF(data.name);
        var email = await requiredF(data.email);
        var phone = await requiredF(data.phone);
        var store = await notRequiredF(data.store, 80);
        var work =  await notRequiredF(data.work, 80);
        var description =  await notRequiredF(data.description, 250);
        var address = await notRequiredF(data.address, 100);
        var facebook = await notRequiredF(data.facebook, 50);
        var instagram = await notRequiredF(data.instagram, 50);

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