const fs = require('fs');

const takeKrakenScreenshot = async (driver, scenario, step) => {
    let ghostVersion = process.env.GHOST_VERSION || '5.114.1';
    if (!fs.existsSync(`./screenshots/v${ghostVersion}`)) {
        fs.mkdirSync(`./screenshots/v${ghostVersion}`, { recursive: true });
    }

    await driver.saveScreenshot(`./screenshots/v${ghostVersion}/${scenario}_${step}.png`);

}

module.exports = {
    takeKrakenScreenshot
}