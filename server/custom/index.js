var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'makertap',
  api_key: '692474461884365',
  api_secret: 'oad5-Tra5epp3DFkZLdggL_7LW4'
})

function uploadFile (file, options, cb) {
  return cloudinary.v2.uploader.upload(file, options, cb)
}

module.exports = {
  uploadFile
}
