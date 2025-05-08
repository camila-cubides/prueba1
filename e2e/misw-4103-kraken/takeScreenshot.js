const fs = require('fs');
const config = require('./properties.json');

const takeKrakenScreenshot = async (driver, scenario, step) => {
    let date = (new Date()).toISOString().split('T')[0];
    let ghostVersion = config.GHOST_VERSION;
    if (!fs.existsSync(`./screenshots/${date}/v${ghostVersion}`)) {
        fs.mkdirSync(`./screenshots/${date}/v${ghostVersion}`, { recursive: true });
    }

    await driver.saveScreenshot(`./screenshots/${date}/v${ghostVersion}/${scenario}_${step}.png`);

}

module.exports = {
    takeKrakenScreenshot
}