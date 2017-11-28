# OpenBCI Observable

Reactive OpenBCI for Node

#### Getting started

This library works with the following OpenBCI hardware:

* [Cyton](https://github.com/OpenBCI/OpenBCI_NodeJS)
* [Ganglion](https://github.com/OpenBCI/OpenBCI_NodeJS_Ganglion)
* [WifiShield](https://github.com/OpenBCI/OpenBCI_NodeJS_Wifi)

Get started by importing the module:

``` bash
npm install --save openbci-observable
```

``` js
const { Cyton, Ganglion, Wifi } = require('openbci-observable');

// Or with an alias...

const BrainObservable  = require('openbci-observable').Ganglion;
```

#### Examples

Basic usage

###### Cyton 

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

###### Ganglion 

``` js
const { Ganglion } = require('openbci-observable');

async function init () {
    const ganglion = new Ganglion();
    await ganglion.connect();
    await ganglion.start();

    ganglion.stream.subscribe(sample =>
        console.log('sample', sample)
    );
}

init();
```

###### Wifi 

``` js
const { Wifi } = require('openbci-observable');

async function init () {
    const wifi = new Wifi();
    await wifi.connect({ ipAddress: 'xx.xx.xx.xx' });
    await wifi.start();

    wifi.stream.subscribe(sample =>
        console.log('sample', sample)
    );
}

init();
```

#### Adding operators

** All operators from this library have been migrated to the [eeg-pipes](https://github.com/alexcastillo/eeg-pipes) 
project. Now these can be used as "lettable" RxJS operators. **

``` js 

// npm install openbci-observable eeg-pipes
const { Ganglion } = require('openbci-observable');
const { voltsToMicrovolts, bufferFFT, alphaRange } = require('eeg-pipes');

async function init () {
    const ganglion = new Ganglion();
    await ganglion.connect();
    await ganglion.start();

    ganglion.stream.pipe(
        voltsToMicrovolts(),
        bufferFFT({ bins: 256 })
        alphaRange()
    ).subscribe(buffer =>
        console.log('alpha buffer', buffer)
    );
}

init();
```

And now we have an FFT buffer of Alpha waves!

#### Dependencies Prerequisites
> Make sure you have **Node version >= 7.8** installed for development purpose.

### License
MIT © [Alex Castillo](https://github.com/alexcastillo)
