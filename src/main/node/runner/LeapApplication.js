const LeapRunners = require("./LeapRunners");
const LeapLoader = require("./LeapLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start(externalComponents) {

        const leapRunners = new LeapRunners();

        const runners = leapRunners.load();

        const environment = new EnvironmentLoader().load();

        const leapLoader = new LeapLoader(environment);

        let runnerComponents = leapLoader.preLoadRunners(runners);

        runnerComponents = runnerComponents.concat(externalComponents);

        const contextLoader = new ContextLoader(runnerComponents);

        let components = contextLoader.load(process.cwd() + "/src");

        const postInstances = leapLoader.postLoadRunners(runners, components);

        components = components.concat(postInstances);

        return components;
    }
}

module.exports = LeapApplication;