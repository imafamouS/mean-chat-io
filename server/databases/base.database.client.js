class DatabaseClient {
    constructor(uri, type) {
        this.uri = uri;
        this.type = type;
    }
    getURI() {
        return this.uri;
    }

    getType() {
        return this.type;
    }

    openConnection() {

    }
}

export default DatabaseClient;