export default class Auth {
    static setUser(record, remember) {
        localStorage.setItem('user', record);
        // normal length of session 1 hour
        let session_length = 2 * 60 * 60 * 1000;
        if (remember === true) {
            // long session lasts 1 year
            session_length = 1 * 365 * 24 * 60 * 60 * 1000;
        }
        localStorage.setItem('expired', new Date().getTime() + session_length);
    };
}