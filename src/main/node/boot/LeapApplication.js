const LeapStarterLoader = require("./LeapStarterLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start() {

        const leapStarterLoader = new LeapStarterLoader();

        const starters = leapStarterLoader.load();

        const environment = new EnvironmentLoader().load();

        const bondComponents = starters.map(bond => startBond(bond, environment));

        const contextLoader = new ContextLoader(bondComponents);

        contextLoader.load(process.cwd() + "/src/main/node/");
    }
}

module.exports = LeapApplication;

function startBond(bond, environment) {
    const AutoConfiguration = require(bond).AutoConfiguration;
    return AutoConfiguration.load(environment);
}