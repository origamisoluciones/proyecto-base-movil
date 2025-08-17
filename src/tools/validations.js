import $ from 'jquery';

/**
 * Validates fields
 * 
 * @param {string} page Page
 * @param {array} toValidate To validate
 * @param {object} container Container
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} length Length
 * @return {int}
 */
function validate(page, toValidate, container, field, value, length = null){
    var check = 0;

    $(container).removeClass('ion-valid');
    $(container).removeClass('ion-invalid');

    $.each(toValidate, function(index, item){
        switch(item){
            case 'isRequired':
                if(check == 0){
                    check += isRequired(page, field, value);
                }
            break;
            case 'isEmail':
                if(check == 0){
                    check += isEmail(page, field, value);
                }
            break;
            case 'checksMaxLength':
                if(check == 0){
                    check += checksMaxLength(page, field, value, length);
                }
            break;
            case 'isPassword':
                if(check == 0){
                    check += isPassword(page, field, value);
                }
            break;
            case 'matchPassword':
                if(check == 0){
                    check += matchPassword(page, field, value, length);
                }
            break;
            case 'isNum':
                if(check == 0){
                    check += isNum(page, field, value);
                }
            break;
            case 'checksMinLenghtNumber':
                if(check == 0){
                    check += checksMinLenghtNumber(page, field, value, length);
                }
            break;
            case 'checksMaxLenghtNumber':
                if(check == 0){
                    check += checksMaxLenghtNumber(page, field, value, length);
                }
            break;
            case 'checksLengthNumber':
                if(check == 0){
                    check += checksLenghtNumber(page, field, value, length);
                }
            break;
        }
    })

    if(check == 0){
        $(container).addClass('ion-valid');
    }else{
        $(container).addClass('ion-invalid');
    }

    return check;
}

/**
 * Cleans validate info
 * 
 * @param {string} page 
 * @param {string} field 
 */
function cleanValidate(page, field, type = null){
    switch(type){
        case 'select':
            $('.' + page).not('.ion-page-hidden').find('#' + field).val(null);
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).val('');
        break;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Campo requerido').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeClass('ion-valid');
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeClass('ion-invalid');
        break;
    }
}

/**
 * Checks if a field is required
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @return {int}
 */
function isRequired(page, field, value){
    if(value == '' || value == null || (typeof value == 'string' && value != null && value.trim() == '')){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Campo requerido').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Campo requerido');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }
    
    return 0;
}

/**
 * Checks if a field is an email
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @return {int}
 */
function isEmail(page, field, value){
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(value)){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Formato incorrecto').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Formato incorrecto');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks if a field has the wrong length
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} length Length
 * @return {int}
 */
function checksMaxLength(page, field, value, length){
    if(value.length > length){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Longitud máxima permitida: ' + length + ' caracteres').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Longitud máxima permitida: ' + length + ' caracteres');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks a password field
 * At least 6 characters
 * At least a lower character
 * At least a capital character
 * At least a number
 * At least a special character (@$!%*?&#.,:;_-)
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} length Length
 * @return {int}
 */
function isPassword(page, field, value){
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\.,:;_-])[A-Za-z\d@$!%*?&#\.,:;_-]{8,}$/
    if(!regex.test(value)){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Formato incorrecto (mínimo 8 caracteres y al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial)').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Formato incorrecto (mínimo 8 caracteres y al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial)');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }
    
    return 0;
}

/**
 * Checks if a required field
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} repeatValue Repeat value
 * @return {int}
 */
function matchPassword(page, field, value, repeatValue){
    if(value !== repeatValue){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Las contraseñas no coinciden').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Las contraseñas no coinciden');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks if a field is a number
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @return {int}
 */
function isNum(page, field, value){
    if(isNaN(value)){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Formato incorrecto').removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Formato incorrecto');
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks a number field min lenght
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} minLenght Min length
 * @return {int}
 */
function checksMinLenghtNumber(page, field, value, minLenght){
    if(parseFloat(value) < minLenght){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Longitud mínima permitida: ' + minLenght).removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Longitud mínima permitida: ' + minLenght);
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks a number field max lenght
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} maxLenght Max length
 * @return {int}
 */
function checksMaxLenghtNumber(page, field, value, maxLenght){
    if(parseFloat(value) > maxLenght){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Longitud mínima permitida: ' + maxLenght).removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Longitud mínima permitida: ' + maxLenght);
            break;
        }
        
        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

/**
 * Checks a number field lenght
 * 
 * @param {string} page Page
 * @param {string} field Field
 * @param {string} value Value
 * @param {int} length Min length
 * @return {int}
 */
function checksLenghtNumber(page, field, value, length){
    if(parseFloat(value) != length){
        switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
            case 'ion-select':
            case 'ion-datetime':
            case 'div':
                $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').text('Longitud permitida: ' + length).removeClass('d-none');
            break;
            default:
                $('.' + page).not('.ion-page-hidden').find('#' + field).attr('error-text', 'Longitud permitida: ' + length);
            break;
        }

        return 1;
    }

    switch($('.' + page).not('.ion-page-hidden').find('#' + field).prop('tagName').toLowerCase()){
        case 'ion-select':
        case 'ion-datetime':
        case 'div':
            $('.' + page).not('.ion-page-hidden').find('#' + field + 'Error').addClass('d-none');
        break;
        default:
            $('.' + page).not('.ion-page-hidden').find('#' + field).removeAttr('error-text');
        break;
    }

    return 0;
}

export {
    validate,
    cleanValidate
}