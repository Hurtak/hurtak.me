'use strict'

const url = require('url')

module.exports = {
  port: process.env.APP_PORT || 8000,

  siteUrl: url.parse(process.env.APP_URL || 'https://hurtak.cc'),

  articles: {
    articlesPerPage: 10
  },

  nunjucks: {
    autoescape: true, // (default: true) controls if output with dangerous characters are escaped automatically.
    throwOnUndefined: true, // (default: false) throw errors when outputting a null/undefined value
    trimBlocks: true, // (default: false) automatically remove trailing newlines from a block/tag
    lstripBlocks: true, // (default: false) automatically remove leading whitespace from a block/tag
    useCache: false, // (default: false) will enable cache and templates will never see updates.
    noCache: true, // (default: false) never use a cache and recompile templates each time (server-side)
    watch: true // (default: false) reload templates when they are changed (server-side)
  }
}