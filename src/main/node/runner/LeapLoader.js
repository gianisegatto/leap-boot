class LeapLoader {

    constructor(environment) {
        this.environment = environment;
    }

    preLoadRunners(runners) {
        return runners.map(runner => preLoad(runner))
                    .filter(component => component !== undefined);
    }

    preLoad(runner) {
        const AutoConfiguration = require(runner).AutoConfiguration;
        return AutoConfiguration.preLoad(this.environment);
    }

    postLoadRunners(runners, components) {
        return runners.map(runner => postLoad(runner, components))
                      .filter(component => component !== undefined);
    }

    postLoad(runner, components) {
        const AutoConfiguration = require(runner).AutoConfiguration;
        return AutoConfiguration.postLoad(components);
    }
}

module.exports = LeapLoader;