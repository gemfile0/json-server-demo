const fs = require('fs')
const path = require('path')

const content = fs.readFileSync(
    path.resolve(__dirname, './tmp/template.db.json')
)
fs.writeFileSync(
    path.resolve(__dirname, './tmp/db.json'), 
    content
)