var cloudinary = require('cloudinary')
var algoliasearch = require('algoliasearch')
var algolia = algoliasearch('ENDTXRMXJ8', 'c9e07f4492ce146a0e9d16a45c24f54f')

cloudinary.config({
  cloud_name: 'makertap',
  api_key: '692474461884365',
  api_secret: 'oad5-Tra5epp3DFkZLdggL_7LW4'
})

function uploadFile (file, options, cb) {
  return cloudinary.v2.uploader.upload(file, options, cb)
}

module.exports = {
  uploadFile,
  algolia
}
