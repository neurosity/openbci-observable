
const { Cyton } = require('../src/index');

async function init () {
    const cyton = new Cyton({
        verbose: true,
        simulate: true
    });

    await cyton.connect();
    await cyton.start();

    cyton.stream.subscribe(sample =>
        console.log('sample', sample)
    );
}

init();
