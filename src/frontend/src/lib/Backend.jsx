// o-gpsy backend

export interface LiveBackend {
    getCompetitors(event_id, done, err): void;
    getCoordinates(event_id, done, err): void;
    putCoordinats(u, p, x, y, t, done, err): void;
    getTime(done, err): void;
}

export interface Backend {
    live: LiveBackend;
}

let backend = null;

export function getBackend(): Backend {
    if (backend != null) {
        return backend;
    } else {
        throw new Error("Missing backend singleton");
    }
}

export function setBackend(_backend: Backend): void {
    backend = _backend;
}