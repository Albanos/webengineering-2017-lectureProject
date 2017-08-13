/**
    * @author Luan Hajzeraj on 26.07.2017.
    */


/*
 Erläuterung: Nimm alles aus index.js, packe alle auch darin enthaltenen Abhängigkeiten in eine bundle.js,
 nehme alle ".js" & ".jsx"-Dateien und nutze dafür react-Compiler, baue EcmaScript6 in EcmaScript5 um (da
 Browser ehr dies unterstützen)

 NUN: Kopiere den ganzen Inhalt aus dem Ordner assets, sowie die index.html nach ressources/public,
 damit Spring quasi alles ohne besondere Pfade ausführen kann
 */

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
        entry: [
            './src/index.js'
        ],
        devtool: 'source-map',
        output: {
            path: __dirname + '/../resources/public',
                publicPath: '/',
                filename: 'bundle.js'
        },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'assets/**/*'},
            {from: 'locales/**/*'},
            {from: 'index.html'}
        ])
    ],
    module: {
            loaders: [{
                exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-1']
                    }
            }]
    },
    resolve: {
            extensions: ['.js', '.jsx']
    }
};