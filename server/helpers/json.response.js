class JsonResponse {
    constructor(success, code, message, data, err) {
        this.success = success;
        this.status = code;
        this.statusText = message;
        if (data != null || data != undefined) {
            this.data = data;
            this.errors = undefined;
        }
        if (err != null || err != undefined) {
            this.data = undefined;
            this.errors = err;
        }
    }
}

export default JsonResponse;