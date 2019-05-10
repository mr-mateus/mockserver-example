const mockserver = require('mockserver-node');

mockserver
    .start_mockserver(
        {
            serverPort: 1080,
            verbose: true,
            jvmOptions: '-Dmockserver.enableCORSForAllResponses=true'
        })
    .then(async () => {
        console.log('started MockServer');
    }, (error) => {
        console.log(JSON.stringify(error));
    }
    );
