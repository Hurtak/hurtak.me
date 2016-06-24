'use strict'

const PrettyError = require('pretty-error')
const error = new PrettyError()

error.skipNodeFiles()
error.skipPackage(
  'express',
  'mysql',
  'nunjucks'
)

error.start()
