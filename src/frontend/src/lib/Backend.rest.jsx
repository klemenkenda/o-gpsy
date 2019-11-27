import axios from "axios";
import { Backend, LiveBackend } from "./Backend";

export class RestLiveBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0421255;
        this.comp_y = 14.4879161;
    }

    getCompetitors(event, done, err) {
        done({
            0: { name: "Klemen Kenda", club: "OK Azimut", country: "Slovenia" }
        })
    }

    getCoordinates(event, done, err) {
        axios.get("/api/point/1")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            }
        )
    }

    putCoordinates(u, p, x, y, t, done, err) {
        axios.get("/api/register/" + u + "/" + p + "/" + x + "/" + y + "/" + t)
            .then(result => {
                done();
            })
            .catch(error => {
                console.log(error);
                err(error);
            }
        )
    }

    getTime(done, err) {
        axios.get("/api/timestamp")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            }
        )
    }
};

export class RestBackend implements Backend {
    live: LiveBackend;

    constructor() {
        this.live = new RestLiveBackend();
    }
}