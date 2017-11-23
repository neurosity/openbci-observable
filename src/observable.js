
const { Observable } = require('rxjs/Rx');

class BCIObservable extends Observable {
    lift (operator) {
        const observable = new this();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
}

module.exports = BCIObservable;
