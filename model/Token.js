class Token {
    constructor(uuid, expiration) {
        this._uuid = uuid;
        this._expiration = expiration;
    }
    get uuid() { return this._uuid; }
    get expiration() { return this._expiration; }
}

module.exports = Token;