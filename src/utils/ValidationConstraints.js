
export const validateString = (id, value)=>{
    const constraints ={
        presence:{
            allowEmpty: false
        }
    }
    if(value != ""){
        constraints.format ={
            pattern:".+",
            flags:"i",
            message:"value can't be blank."
        }
    }
    const validateResult = validate({[id]:value},{[id]:constraints})
    return validateResult &&  validateResult[id]
}


export const validateEmail = (id, value)=>{
    const constraints ={
        presence:{
            allowEmpty: false
        }
    }
    if(value != ""){
        constraints.email = true
           
    }
    const validateResult = validate({[id]:value},{[id]:constraints})
    return validateResult &&  validateResult[id]
}


export const validatPassword = (id, value)=>{
    const constraints ={
        presence:{
            allowEmpty: false
        }
    }
    if(value != ""){
        constraints.length ={
            minimum: 6,
            message:"must be at least 6 character "
        }
    }
    const validateResult = validate({[id]:value},{[id]:constraints})
    return validateResult &&  validateResult[id]
}