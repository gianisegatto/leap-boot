const STARTER = "starter";
class LeapStarterLoader {
    load() {

        const packageJson = require(process.cwd() + "/package.json");

        const starters = Object.entries(packageJson.dependencies)
            .filter((keyValueArray) => {
                return keyValueArray[0].includes(STARTER);
            })
            .map((keyValueArray) => keyValueArray[0]);
        
        return starters;
    }
}

module.exports = LeapStarterLoader;