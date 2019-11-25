let GenerateSchema = require('./generateschema.js');

let g = new GenerateSchema([
    { name: "ogpsy", items: [ 'downgrade.1.sql'] }
]);
g.execute();