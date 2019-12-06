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
            });
    }

    getCoordinates(event_id, done, err) {
        axios.get("/api/point/" + event_id)
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    }

    putCoordinates(u, p, x, y, t, done, err) {
        axios.get("/api/register/" + u + "/" + p + "/" + x + "/" + y + "/" + t)
            .then(result => {
                done();
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    }

    getTime(done, err) {
        axios.get("/api/timestamp")
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
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
        axios.get(`/api/admin/login/${u}/${p}`)
            .then(result => {
                done(result.data);
            })
            .catch(error => {
                console.log(error);
                err(error);
            });
    };

    async getMaps(u) {
        try {
            let url = `/api/admin/maps/`;
            if (u) url = `/api/admin/maps/${u}`;

            const { data } = await axios.get(url);
            return data;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    };

    async uploadMapImage(map) {
        try {
            const { data } = await axios.post(`/api/admin/maps/upload/${encodeURIComponent(map.filename)}`, map.file, {
                headers: {
                    'content-type': map.file.type
                }
            })
            return data
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async addMap(map) {
        try {
            const image = await this.uploadMapImage(map)
            if (!image) throw 'Map image upload failed'

            const { data } = await axios.post(`/api/admin/maps/add`, { map })
            return data
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    };

    async editMap(map) {
        try {
            if (map.file) {
                const image = await this.uploadMapImage(map)
                if (!image) throw 'Map image upload failed'
            }


            const { data } = await axios.post(`/api/admin/maps/edit`, { map })
            return data
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    };

    async deleteMap(id) {
        try {
            const { data } = await axios.post(`/api/admin/maps/delete`, { id })
            return data
        }
        catch (e) {
            console.log(e);
            throw e;
        }
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