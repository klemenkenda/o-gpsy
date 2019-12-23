class TimeService {

    getTime() {
        return Math.round(new Date().getTime() / 1000);
    }

}

module.exports = TimeService;