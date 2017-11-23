
const CytonRx = require('./cyton');
const GanglionRx = require('./ganglion');

const getProxy = proxy => new Proxy(proxy, {
    apply(target, context, args) {
        return new target(...args)
            .toObservable();
    }
});

const Cyton = getProxy(CytonRx);
const Ganglion = getProxy(GanglionRx);

module.exports = {
    Cyton,
    Ganglion
};
