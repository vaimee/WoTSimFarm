import sensorModel from './sensor.td.json'

WoT.produce(sensorModel).then(async sensorThing => {
    sensorThing.expose()
})

