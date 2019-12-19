let GenerateSchema = require('./generateschema.js');

let g = new GenerateSchema([
    { name: 'ogpsy', items: [ 'init.1.sql', 'init.2.sql', 'upgrade.1.sql', 'data.1.sql' ] }
]);
g.execute();