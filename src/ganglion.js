
const Ganglion = require('openbci-ganglion');
const { fromEvent } = require('rxjs/observable/fromEvent');

class GanglionObservable extends Ganglion {

    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, 'sample');
        this._connect = this.connect;
        this.connect = async () => {
            this.searchStart();
            this.once('ganglionFound', peripheral => {
                this.searchStop();
                this._connect(peripheral);
            });
        };
    }

    async start () {
        this.once('ready', async () => {
            await this.streamStart();
        });
    }
}

module.exports = GanglionObservable;
