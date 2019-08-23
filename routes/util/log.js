const Log = require('../../model/Log');

const log = async (type, message, user) => {
    const logger = new Log({ type, message, user});
    logger.save();
};

module.exports = log;