// Script for custom terminal output config
var colors = require('colors/safe');

module.exports = {
    lgc: colors.red.bold('Logic > '),
    api: colors.blue.bold('API   > '),
    bt: colors.green.bold('Boot  > ')
}