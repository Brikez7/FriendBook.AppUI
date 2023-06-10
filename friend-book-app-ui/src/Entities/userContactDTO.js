export default class UserContact {
    constructor() {
        this._fullName = '';
        this._email = '';
        this._telephone = '';
        this._profession = '';
        this._info = '';
    }

    setFullName(value) {
        this._fullName = value;
    }

    get fullName() {
        return this._fullName;
    }

    setEmail(value) {
        this._email = value;
    }

    get email() {
        return this._email;
    }

    setTelephone(value) {
        this._telephone = value;
    }

    get telephone() {
        return this._telephone;
    }

    setProfession(value) {
        this._profession = value;
    }

    get profession() {
        return this._profession;
    }

    setInfo(value) {
        this._info = value;
    }

    get info() {
        return this._info;
    }
}
