const fs = require('fs')
const content = fs.readFileSync('template.db.json')
fs.writeFileSync('db.json', content)