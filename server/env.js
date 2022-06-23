const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`);

dotenv.config({path: envPath});