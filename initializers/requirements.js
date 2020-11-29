cluster = require('cluster');
net = require('net');
farmhash = require('farmhash');
express = require('express');
adaro = require('adaro');
bodyParser = require('body-parser');
redis = require('redis');
expressSession = require('express-session');
redisStore = require('connect-redis')(expressSession);
mongoose = require('mongoose');

config = require('../config.json');
dustJsHelpers = require('./dustjs-helpers');
userModel = require('../models/user-model.js');
require('./lib');

url = `http://${config.address}:${config.port}/`;
notAllowedUrls = ['profile'];