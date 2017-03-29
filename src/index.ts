import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Yaml loader support for *.yaml/*.yml files.
 * See: https://github.com/okonet/yaml-loader
 */
export = function yaml({exclude = null} = {}) {
    return function yaml(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
        return {
            module: {
                rules: get(this, 'module.rules', []).concat([{
                    test: /\.(yaml|yml)/i,
                    use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
                    exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
                }])
            }
        }
    }
};
