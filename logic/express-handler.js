function expressHandler(app){

    const redisClient = redis.createClient();

    mongoose.connect('mongodb://localhost:27017/miner', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false,
        useCreateIndex : true
    });

    app.use(expressSession({
        store: new redisStore({ client: redisClient }),
        secret: 'polybius@Miner',
        resave: false,
        saveUninitialized: true,
    }));
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