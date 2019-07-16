const PLUGIN = "plugin";

class LeapRunners {
    
    load() {
        const packageJson = require(process.cwd() + "/package.json");

        const runners = Object.entries(packageJson.dependencies)
                               .filter(keyValueArray => keyValueArray[0].includes(PLUGIN))
                               .map(keyValueArray => keyValueArray[0]);
        
        return runners;
    }
}

module.exports = LeapRunners;