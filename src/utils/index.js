
const exitEvents = {
    exit: true,
    SIGINT: false,
    uncaughtException: false
};

const listeners = [
    'rawDataPacket',
    'sample'
];

const onExit = context => {
    Object.entries(exitEvents)
        .forEach(([ eventName, cleanUp ]) => {
            process.on(eventName, exit.bind(context, cleanUp));
        });

    async function exit (cleanUp) {
        removeListeners();

        if (cleanUp) {
            return;
        }

        if (context.isStreaming()) {
            context.streamStop();
        }
        
        try {
            await context.disconnect();
        } catch (e) {}

        process.exit(0);
    }

    function removeListeners () {
        listeners
            .forEach(eventName => {
                context.removeAllListeners(eventName);
            });
    }
};

const renameDataProp = sample => {
    const renamedSample = Object.assign({}, sample);
    renamedSample.data = renamedSample.channelData;
    delete renamedSample.channelData;
    return renamedSample;
};

module.exports = {
    onExit,
    renameDataProp
};
