/** Utility function for processing incoming strings */
exports.emptyIsNull = (s) => {
    if (!s) {
        return null;
    }
    s = s.trim();
    if (s.length == 0) {
        return null;
    }
    return s;
};

/** Utility function for extracting data from request body */
exports.extractBodyParam = (body, name) => {
    if (!exports.existsBodyParam(body, name)) {
        throw new Error('Missing mandatory field: ' + name);
    }
    return body[name];
};

/** Utility function for extracting data from request body */
exports.existsBodyParam = (body, name) => {
    return Object.keys(body).indexOf(name) >= 0;
};

/** Utility method for combining parameters from different parts of request */
exports.combineParams = (req) => {
    const res = {};
    Object.assign(res, req.body);   // parsed body of POST request
    Object.assign(res, req.params); // parameters in URL route, e.g. /datasources/:id/analyses
    Object.assign(res, req.query);  // parameters in URL after ?, e.g. /datasources?type=a
    return res;
};

