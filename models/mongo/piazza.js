const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * piazza's point 
 */
const pointSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true, default: 'analog', enum: ['analog', 'digital']},
  state: {type: String, required: true, default: 'OK', enum: ['OK', 'ERROR']},
})

/**
 * piazza device
 */
const PiazzaSchema = new Schema({
  mac: {type: String, required: true},
  state: {type: String, required: true, default: 'OffLine', enum: ['OnLine', 'OffLine']},
  points: [pointSchema],
  description: {type: String},
})

const PiazzaModel = mongoose.model('piazza', PiazzaSchema)

async function create (params) {

  let points = params.points;
  pointsArr = points? JSON.parse(points) : [];
  
  const piazza = new PiazzaModel({
    mac: params.mac, 
    description: params.description, 
    points: pointsArr,
  })

  let created = await piazza.save()
    .catch(e => {
      switch (e.code) {
        default:
          console.log(e)
          throw Error(`error creating piazza ${ JSON.stringify(params) }`)
      }
    })

    console.log('add success!!', created)
    return {
        status: 'SUCCESS',
        _id: created._id,
    }
}

module.exports = {
  model: PiazzaModel,
  create
}



