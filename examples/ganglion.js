
const BrainObservable = require('../src/index').Ganglion;

const options = {
    verbose: true,
    //simulate: true // Not yet supported
};

const brainwaves = BrainObservable(options)
    .subscribe(sample =>
        console.log('sample', sample)
    );
