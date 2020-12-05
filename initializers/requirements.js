express = require('express');
helmet = require('helmet');
adaro = require('adaro');
bodyParser = require('body-parser');
redis = require('redis');
session = require('express-session');
redisStore = require('connect-redis')(session);
socketIo = require('socket.io');
ioRedis = require('socket.io-redis');
mongoose = require('mongoose');
uniqid = require('uniqid');

config = require('../config.json');
dustJsHelpers = require('./dustjs-helpers');
userModel = require('../models/user-model.js');
expressHandler = require('../logic/express-handler');
socketHandler = require('../logic/socket-handler');
GameController = require('../logic/game-controller');
require('./lib');

url = `http://${config.address}:${config.port}/`;
notAllowedUrls = ['profile', 'game'];
dirpath = require.main.path + '/';

redisClient = redis.createClient(config.redis_url);
sessionMiddleware = session({
    store: new redisStore({ client: redisClient }),
    secret: 'polybius@Miner',
    resave: false,
    saveUninitialized: true,
})