function init() {}

function log(error) {
  console.error(error);
}

const exportedObject = {
    init,
    log,
};

export default exportedObject
