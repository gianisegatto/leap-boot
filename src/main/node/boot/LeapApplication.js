const LeapStarterLoader = require("./LeapStarterLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start(externalComponents) {

        const leapStarterLoader = new LeapStarterLoader();

        const bonds = leapStarterLoader.load();

        const environment = new EnvironmentLoader().load();

        let bondComponents = preLoadBonds(bonds, environment);

        bondComponents = bondComponents.concat(externalComponents);

        const contextLoader = new ContextLoader(bondComponents);

        let components = contextLoader.load(process.cwd() + "/src/main/node/");

        const postInstances = postLoadBonds(bonds, components);

        components = components.concat(postInstances);

        return components;
    }
}

module.exports = LeapApplication;

function preLoadBonds(bonds, environment) {
    return bonds.map(bond => preLoad(bond, environment))
        .filter(component => component !== undefined);
}

function preLoad(bond, environment) {
    const AutoConfiguration = require(bond).AutoConfiguration;
    return AutoConfiguration.preLoad(environment);
}

function postLoadBonds(bonds, components) {
    return bonds.map(bond => postLoad(bond, components))
        .filter(component => component !== undefined);
}

function postLoad(bond, components) {
    const AutoConfiguration = require(bond).AutoConfiguration;
    return AutoConfiguration.postLoad(components);
}