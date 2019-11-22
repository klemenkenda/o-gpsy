import { Backend, LiveBackend } from "./Backend";

export class MockLiveBackend implements LiveBackend {
    getCompetitors(event, done, err) {
        done({
            0: { name: "Klemen Kenda", club: "OK Azimut", country: "Slovenia" }
        })
    }
    getCoordinates(event, done, err) {
        done({
            0: [{x: 45, y: 23}]
        });
    }
}

export class MockBackend implements Backend {
    live: LiveBackend;

    constructor() {
        this.live = new MockLiveBackend();
    }
}