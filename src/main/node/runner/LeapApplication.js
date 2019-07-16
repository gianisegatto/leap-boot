const LeapRunners = require("./LeapRunners");
const LeapLoader = require("./LeapLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start(externalComponents) {

        const leapStarterLoader = new LeapRunners();

        const bonds = leapStarterLoader.load();

        const environment = new EnvironmentLoader().load();

        const leapLoader = new LeapLoader(environment);

        let bondComponents = leapLoader.preLoadRunners(bonds);

        bondComponents = bondComponents.concat(externalComponents);

        const contextLoader = new ContextLoader(bondComponents);

        let components = contextLoader.load(process.cwd() + "/src/main/node/");

        const postInstances = leapLoader.postLoadRunners(bonds, components);

        components = components.concat(postInstances);

        return components;
    }
}

module.exports = LeapApplication;