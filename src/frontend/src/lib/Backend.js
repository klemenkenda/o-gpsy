// o-gpsy backend

export interface LiveBackend {
    getCompetitors(event, done, err);
    getCoordinates(event, done, err);
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