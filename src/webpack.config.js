module.exports = {
    entry:{
        index : "./js/index.js"
    },
    output:{
        filename:"[name].js"
    },
    devtool:"source-map",
    resolve:{
        extensions:[".js"]
    },
    module:{
        loader:[
            {
                test:/\.js$/,
                loader:"babel",
                exclude:"node_modules",
                query:{
                    presets:["es2015"]
                }
            }
        ]
    }
}