# OpenBCI Rx

Reactive Extensions for OpenBCI in Node

#### Dependencies Prerequisites
> Make sure you have **Node version >= 7.8** installed for development purpose.

#### Getting started

This library works with the following OpenBCI hardware:

* [Cyton](https://github.com/OpenBCI/OpenBCI_NodeJS)
* [Ganglion](https://github.com/OpenBCI/OpenBCI_NodeJS_Ganglion)

Get started by importing the module:

``` bash
npm install --save openbci-rx
```

``` js
const { Cyton, Ganglion } = require('openbci-rx');

// Or with an alias...

const BrainObservable  = require('openbci-rx').Ganglion;
```

#### Examples

Basic usage

``` js
const BrainObservable = require('openbci-rx').Cyton;

// Same options accepted by 'openbci'
const options = {
    verbose: true,
    simulate: true
};

const brainwaves = BrainObservable(options)
    .subscribe(sample =>
        console.log(sample)
    );
```

#### Adding operators

** All operators from this library have been migrated to the [eeg-pipes](https://github.com/alexcastillo/eeg-pipes) 
project. Now these can be used as "lettable" RxJS operators. **

``` js 

// npm install --save eeg-pipes
import { voltsToMicrovolts, bufferFFT, alphaRange } from 'eeg-pipes';

const brainwaves = BrainObservable(options)
    .pipe(
        voltsToMicrovolts(),
        bufferFFT({ bins: 256 })
        alphaRange()
    ).subscribe(buffer =>
        console.log(buffer)
    );
```

And now we have an FFT buffer of Alpha waves!

### License
MIT © [Alex Castillo](https://github.com/alexcastillo)
