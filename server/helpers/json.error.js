import HttpStatus from '../utils/http.status';

class ErrorResponse {
    constructor(name, property) {
        this.name = name;
        this.property = property;
    }
}

export default ErrorResponse;