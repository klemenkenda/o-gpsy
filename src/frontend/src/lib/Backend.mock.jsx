import { Backend, LiveBackend } from "./Backend";

export class MockLiveBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0420155;
        this.comp_y = 14.4879161;
    }

    getCompetitors(event, done, err) {
        done({
            0: { name: "Klemen Kenda", club: "OK Azimut", country: "Slovenia" }
        })
    }
    getCoordinates(event, done, err) {
        this.comp_x += (Math.random() - 0.5) / 10000;
        this.comp_y += (Math.random() - 0.5) / 10000;
        done(
            {lat: this.comp_x, lon: this.comp_y, ts: Math.round(new Date().getTime()/1000)}
        );
    }

    putCoordinates(u, p, x, y, t, done, err) {
        done();
    }

    getTime(done, err) {
        done(Math.round(new Date().getTime() / 1000));
    }
}

export class MockBackend implements Backend {
    live: LiveBackend;

    constructor() {
        this.live = new MockLiveBackend();
    }
}