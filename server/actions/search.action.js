var ChannelSchema = require('../models/channel.model')

function search (req, res) {
  const type = req.query.type || 'channel'
  const status = req.query.status || 'live'
  const keyword = req.query.keyword || ''
  const limit = req.query.limit || 30
  const specialties = req.query.specialty && req.query.specialty.length
  ? req.query.specialty.split(',') : null
  let filters = {}
  if (specialties) {
    Object.assign(filters, {
      specialty: {
        $in: specialties
      }
    })
  }

  filters.status = status
  filters.type = type

  if (type === 'channel') {
    return ChannelSchema.textSearch(keyword, { filter: filters, limit: limit }, (err, channels) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'Something went wrong'
        })
      }
      return res.status(200).json({
        type: type,
        channels: channels
      })
    })
  } else if (type === 'videos') {
    return res.status(200).json({
      message: 'Not supported yet.'
    })
  }
}

module.exports = {
  search
}
