import axios from "axios";
import { Backend, LiveBackend, AdminBackend } from "./Backend";

export class RestLiveBackend implements LiveBackend {
    constructor() {
        this.comp_x = 46.0421255;
        this.comp_y = 14.4879161;
    }

    getCompetitors(event, done, err) {
        axios.get("/api/competitors?event_id=" + event)
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            }
        );
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

    getEvents(done, err) {
        axios.get("/api/admin/events")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    }
};

export class RestAdminBackend implements AdminBackend {
    login(u, p, done, err) {
        axios.get("/api/admin/login/" + u + "/" + p)
            .then(result => {                
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };
}

export class RestBackend implements Backend {
    live: LiveBackend;
    admin: AdminBackend;

    constructor() {
        this.live = new RestLiveBackend();
        this.admin = new RestAdminBackend();
    }
}