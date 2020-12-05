function expressHandler(app){

    const redisClient = redis.createClient(config.redis_url);

    mongoose.connect(config.mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false,
        useCreateIndex : true,
        authSource : 'admin'
    });

    app.use(sessionMiddleware);
    app.use(helmet());
    app.engine('dust', adaro.dust(dustJsHelpers));
    app.set('view engine', 'dust');
    app.use(express.static(dirpath + 'public/assets'));
    app.set('views', dirpath + 'public/views');
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(bodyParser.json());

    app.use('/', require('../routs/routs'));

    app.locals.url = url;

};

module.exports = expressHandler;