export default class Auth {
    static setUser(record, remember) {
        localStorage.setItem('user', record.name);
        localStorage.setItem('username', record.username);
        localStorage.setItem('password', record.password);
        localStorage.setItem('user_ts', record.ts);
        localStorage.setItem('type', record.type);

        // normal length of session 1 hour
        let session_length = 2 * 60 * 60 * 1000;
        if (remember === true) {
            // long session lasts 1 year
            session_length = 1 * 365 * 24 * 60 * 60 * 1000;
        }
        localStorage.setItem('expired', new Date().getTime() + session_length);
    };

    static checkUserShallow() {
        if (localStorage.getItem('expired') > new Date().getTime()) {
            return true;
        }
    }

    static getUser() {
        return {
            user: localStorage.getItem('user'),
            username: localStorage.getItem('username')
        }
    }
}