cluster = require('cluster');
net = require('net');
express = require('express');
adaro = require('adaro');
bodyParser = require('body-parser');
redis = require('redis');
expressSession = require('express-session');
redisStore = require('connect-redis')(expressSession);
socketIo = require('socket.io');
ioRedis = require('socket.io-redis');
mongoose = require('mongoose');
uniqid = require('uniqid');

config = require('../config.json');
dustJsHelpers = require('./dustjs-helpers');
userModel = require('../models/user-model.js');
expressHandler = require('../express-handler');
socketHandler = require('../socket-handler');
require('./lib');

url = `http://${config.address}:${config.port}/`;
notAllowedUrls = ['profile', 'game'];