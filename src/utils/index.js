
const renameDataProp = sample => {
    const renamedSample = Object.assign({}, sample);
    renamedSample.data = renamedSample.channelData;
    delete renamedSample.channelData;
    return renamedSample;
};

module.exports = {
    renameDataProp
};
