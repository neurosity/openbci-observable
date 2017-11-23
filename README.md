# OpenBCI Observable

Reactive OpenBCI for Node

#### Getting started

This library works with the following OpenBCI hardware:

* [Cyton](https://github.com/OpenBCI/OpenBCI_NodeJS)
* [Ganglion](https://github.com/OpenBCI/OpenBCI_NodeJS_Ganglion)

Get started by importing the module:

``` bash
npm install --save openbci-observable
```

``` js
const { Cyton, Ganglion } = require('openbci-observable');

// Or with an alias...

const BrainObservable  = require('openbci-observable').Ganglion;
```

#### Examples

Basic usage

``` js
const { Cyton } = require('openbci-observable');

async function init () {
    const cyton = new Cyton();
    await cyton.connect();
    await cyton.start();

    cyton.stream.subscribe(sample =>
        console.log('sample', sample)
    );
}

init();
```

#### Adding operators

** All operators from this library have been migrated to the [eeg-pipes](https://github.com/alexcastillo/eeg-pipes) 
project. Now these can be used as "lettable" RxJS operators. **

``` js 

// npm install --save eeg-pipes
import { voltsToMicrovolts, bufferFFT, alphaRange } from 'eeg-pipes';

cyton.stream.pipe(
    voltsToMicrovolts(),
    bufferFFT({ bins: 256 })
    alphaRange()
).subscribe(buffer =>
    console.log(buffer)
);
```

And now we have an FFT buffer of Alpha waves!

#### Dependencies Prerequisites
> Make sure you have **Node version >= 7.8** installed for development purpose.

### License
MIT © [Alex Castillo](https://github.com/alexcastillo)
