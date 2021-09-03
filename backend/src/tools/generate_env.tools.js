const { chalkSuccess, chalkError, chalkProcessing } = require("./chalk.tools")
const shell = require("shelljs")
const fs = require("fs")
const file_path = 'src/tools/env-tmp.tools.js'

// console.log(chalkProcessing("Generating file..."))
// shell.cp(".env-tmp", file_path)
// const env = require('./env-tmp.tools')
// const env_production = JSON.stringify(env)

// fs.writeFileSync('src/config/production.json', env_production, 'utf8', (err) => {
//     if (err) return console.log(chalkError(`An error occured while writing JSON Object to File. ${err}`))

//     console.log(chalkProcessing("Generating file..."))
//     console.log(chalkSuccess("JSON file has been saved."))
// })

// console.log(chalkSuccess("finished."))
