import JsonResponse from './json.response';
import ErrorResponse from './json.error';
import HttpStatus from '../utils/http.status';

function makeJsonResponseSuccess(message, data) {
    return new JsonResponse(true, HttpStatus.OK, message, data, null);
}

function makeJsonResponseFailure(err) {
    let listError = [];
    let errors = err.errors;
    if (errors == null || errors == undefined) {
        return new JsonResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500], null, err);
    }
    for (let key in errors) {
        if (err.errors.hasOwnProperty(key)) {
            delete errors[key].properties.value;
            let err = new ErrorResponse(errors[key].name, errors[key].properties);
            listError.push(err);
        }
    }
    return new JsonResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus[500], null, listError);
}

export default { makeJsonResponseSuccess, makeJsonResponseFailure };