const logError = (error: Error) => {
    console.error(new Date().toISOString(), error.message);
};

const logInfo = (message: string) => {
    console.log(new Date().toISOString(), message);
};

const logDebug = (message: string) => {
    console.debug(new Date().toISOString(), message);
};

const logWarn = (message: string) => {
    console.warn(new Date().toISOString(), message);
};

export default {
    logError,
    logInfo,
    logDebug,
    logWarn,
};
