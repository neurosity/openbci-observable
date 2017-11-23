
const { Ganglion } = require('../src/index');

async function init () {
    const ganglion = new Ganglion({
        verbose: true,
        simulate: true
    });

    await ganglion.connect();
    await ganglion.start();

    ganglion.stream.subscribe(sample =>
        console.log('sample', sample)
    );
}

init();
