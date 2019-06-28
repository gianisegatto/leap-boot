const BOND = "bond";

class LeapStarterLoader {
    load() {

        const packageJson = require(process.cwd() + "/package.json");

        const starters = Object.entries(packageJson.dependencies)
            .filter(keyValueArray => keyValueArray[0].includes(BOND))
            .map(keyValueArray => keyValueArray[0]);
        
        return starters;
    }
}

module.exports = LeapStarterLoader;