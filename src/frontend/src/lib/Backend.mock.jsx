import { Backend, LiveBackend } from "./Backend";

export class MockLiveBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0420155;
        this.comp_y = 14.4879161;
        this.comp_x2 = 46.0423155;
        this.comp_y2 = 14.4849161;
    }

    getCompetitors(event, done, err) {
        done([
            {
                "ts":"2019-11-27T14:10:54.000Z","id":1,"event_id":1,"tracker_id":1,
                "name":"Klemen Kenda","club":"OK Azimut","country":"SLO",
                "track":[{"ts":1574867257,"lon":14.4874174,"lat":46.0421246}],
                "start": null
            },
            {
                "ts":"2019-11-27T14:10:54.000Z","id":1,"event_id":1,"tracker_id":1,
                "name":"Simon Stanonik","club":"OK Azimut","country":"SLO",
                "track":[{"ts":1574867257,"lon":14.4849174,"lat":46.0423246}],
                "start": null
            }
        ]);
    }
    getCoordinates(event, done, err) {
        this.comp_x += (Math.random() - 0.5) / 10000;
        this.comp_y += (Math.random() - 0.5) / 10000;
        this.comp_x2 += (Math.random() - 0.5) / 10000;
        this.comp_y2 += (Math.random() - 0.5) / 10000;
        done([
            {lat: this.comp_x, runner_id: 1, lon: this.comp_y, ts: Math.round(new Date().getTime()/1000)},
            {lat: this.comp_x2, runner_id: 2, lon: this.comp_y2, ts: Math.round(new Date().getTime()/1000)}
        ]);
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