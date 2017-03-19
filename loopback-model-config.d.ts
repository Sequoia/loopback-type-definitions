declare namespace Loopback {
    /**
     * Connects models to datasources.
 @see https://docs.strongloop.com/display/public/APIC/model-config.json
     */
    export interface ModelConfig {
        [name: string]: ModelConfigProperty;
        /**
         * Custom paths to autoload models & mixins
         */
        _meta?: {
            /**
             * By default, LoopBack applications load models from `/common/models` subdirectory. To specify a different location (or even multiple locations) use the  `_meta.sources` property, whose value is an array of directory paths
             */
            sources?: string[];
            /**
             * Array of relative paths to custom mixin definitions. See [Defining mixins](https://docs.strongloop.com/display/APIC/Defining+mixins) for more information.
             */
            mixins?: string[];
        };
    }

    export interface ModelConfigProperty {
        /**
         * Name of the data source to which the model is connected. Must correspond to a data source defined in [datasources.json](https://docs.strongloop.com/display/APIC/datasources.json).
         */
        dataSource?: string;
        /**
         * Whether the model API is exposed.

If `true`, then the model is exposed over REST. Does not affect accessibility of Node API.
          */
        public?: boolean;
    }
}
