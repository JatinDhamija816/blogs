const deviceInfo = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    let deviceType = '';
    if (userAgent.toLowerCase().includes('windows')) {
        deviceType = 'PC Chrome Web Browser';
    } else if (userAgent.toLowerCase().includes('android')) {
        deviceType = 'Android Phone';
    } else if (userAgent.toLowerCase().includes('iphone')) {
        deviceType = 'iPhone Safari-Mobile Browser';
    }

    const indianTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    req.deviceType = deviceType;
    req.time = indianTime
    next()
};

export default deviceInfo
