const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const App = require('./app');

App.run();
