const LeapStarterLoader = require("./LeapStarterLoader");
const EnvironmentLoader = require("leap-core").EnvironmentLoader;
const ContextLoader = require("leap-context").ContextLoader;

class LeapApplication {

    static start() {

        const leapStarterLoader = new LeapStarterLoader();

        const bonds = leapStarterLoader.load();

        const environment = new EnvironmentLoader().load();

        const bondComponents = preLoadBonds(bonds, environment);

        const contextLoader = new ContextLoader(bondComponents);

        const components = contextLoader.load(process.cwd() + "/src/main/node/");

        const postInstances = postLoadBonds(bonds, components);

        components.concat(postInstances);

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
    return bonds.map(bond => postLoad(bond, environment))
                .filter(component => component !== undefined);
}

function postLoad(bond, components) {
    const AutoConfiguration = require(bond).AutoConfiguration;
    return AutoConfiguration.postLoad(components);
}