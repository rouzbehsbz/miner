require('./initializers/requirements');

const cpuThreads = require('os').cpus().length;

if(cluster.isMaster){
    
    let workers = [];

    let spawnWorker = function(i){

        workers[i] = cluster.fork();

        workers[i].on('exit', (code, signal)=>{
            spawnWorker(i);
        });

    }

    for(let i = 0; i < cpuThreads; i++){

        spawnWorker(i);

    }

    let workerIndex = function(ip, len){

        return farmhash.fingerprint32(ip) % len;

    }

    net.createServer({pauseOnConnect : true}, (connection)=>{

        let worker = workers[workerIndex(connection.remoteAddress, cpuThreads)];
        worker.send('sticky-session:connection', connection);

    }).listen(config.port);
    
}
else{

    const app = express();
    const server = app.listen(0, config.address);

    app.engine('dust', adaro.dust(dustJsHelpers));
    app.set('view engine', 'dust');
    app.use(express.static(__dirname + '/public/assets'));
    app.set('views', __dirname + '/public/views');
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(bodyParser.json());

    app.use('/', require('./routs/routs'));

    process.on('message', (msg, connection)=>{

        if(msg !== 'sticky-session:connection'){

            return;

        }

        server.emit('connection', connection);
        connection.resume();

    });

}