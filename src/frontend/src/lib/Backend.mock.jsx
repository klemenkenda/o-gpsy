import { Backend, LiveBackend } from "./Backend";

export class MockLiveBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.056946;
        this.comp_y = 14.505751;
    }

    getCompetitors(event, done, err) {
        done({
            0: { name: "Klemen Kenda", club: "OK Azimut", country: "Slovenia" }
        })
    }
    getCoordinates(event, done, err) {
        this.comp_x += (Math.random() - 0.5) / 10000;
        this.comp_y += (Math.random() - 0.5) / 10000;
        done([
            {x: this.comp_x, y: this.comp_y}
        ]);
    }
}

export class MockBackend implements Backend {
    live: LiveBackend;

    constructor() {
        this.live = new MockLiveBackend();
    }
}