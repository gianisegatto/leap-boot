const LeapStarterLoader = require("./LeapStarterLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start() {

        const leapStarterLoader = new LeapStarterLoader();

        const starters = leapStarterLoader.load();

        const environment = new EnvironmentLoader().load();

        const starterComponents = starters.map(starter => startStarter(starter, environment));

        const contextLoader = new ContextLoader();

        contextLoader.load(starterComponents);
    }
}

module.exports = LeapApplication;

function startStarter(starter, environment) {
    const AutoConfiguration = require(starter).AutoConfiguration;
    return AutoConfiguration.load(environment);
}