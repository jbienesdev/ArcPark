const functions = require('firebase-functions')
const admin = require('firebase-admin')
const {WebhookClient} = require('dialogflow-fulfillment');
const getTime = require('date-fns/get_time')
const format = require('date-fns/format')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.startLockdownTimer = functions.database.ref('/parking_area/{areaNumber}/distance_in_cm')
  .onUpdate((change, context) => {
    return admin.database().ref(`parking_area/${context.params.areaNumber}/counter`).once('value', snapshot => {
      let counter = snapshot.val()

      if(change.after.val() >= 30) {
        return change.after.ref.parent.child('counter').set(1)
      }

      if(counter === 3) {
        change.after.ref.parent.child('status').set('occupied')
        change.after.ref.parent.child('counter').set(1)
      } else {
        change.after.ref.parent.child('counter').set(counter + 1)
      }
    })
  })
  
exports.logTransaction = functions.database.ref('/parking_area/{areaNumber}/status')
  .onUpdate((change, context) => {
    let status = change.after.val()
    return admin.database().ref(`parking_area/${context.params.areaNumber}`).once('value', snapshot => {
      let plateNumber = snapshot.val().plate_number
      let reservedTo = snapshot.val().reservedTo
      let vehicle_type = snapshot.val().vehicle_type

      // Must have the plate number
      if(status === 'available') {
        admin.database().ref('logs').push({
          time: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a'),
          timestamp: getTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })),
          date: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY'),
          message: `Area ${context.params.areaNumber} is now available.`,
          status: 'available'
        })
      } else if(status === 'reserved') {
        admin.database().ref('logs').push({
          time: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a'),
          timestamp: getTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })),
          date: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY'),
          message: `${ reservedTo } is now reserved for area ${context.params.areaNumber}.`,
          status: 'reserved'
        })
      } else if(status === 'waiting') {
        admin.database().ref('logs').push({
          time: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a'),
          timestamp: getTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })),
          date: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY'),
          message: `${ !reservedTo ? `${ plateNumber } (${vehicle_type}) has entered the parking area. Assigned to area ${context.params.areaNumber}` : `${ reservedTo }(${ plateNumber }) has entered the parking area. Assigned to area ${context.params.areaNumber}`}`,
          status: 'waiting'
        })
      } else if(status === 'occupied') {
        admin.database().ref('logs').push({
          time: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a'),
          timestamp: getTime(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })),
          date: format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY'),
          message: `${ plateNumber } (${vehicle_type}) is now parked at ${context.params.areaNumber}.`,
          status: 'occupied'
        })
      }
    })
  })

exports.dialogflowAvailableSpaces = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

  function checkAvailableSpace(agent) {
    return admin.database().ref('parking_area').once('value', snap => {
      let parkingAreas = []
      snap.forEach(childSnap => {
        parkingAreas.push(childSnap.val())
      })
      let availableParkingAreas = parkingAreas.filter(parkingArea => parkingArea.status === 'available')
      if(availableParkingAreas.length > 0) {
        agent.add(`There are ${availableParkingAreas.length} available parking space${availableParkingAreas.length > 1 ? 's' : ''}.`)
      } else {
        agent.add(`Sorry. The parking area is full.`)
      }
    })
  }

  let intentMap = new Map();
  intentMap.set('Check available spaces', checkAvailableSpace);
  agent.handleRequest(intentMap);
})

// Status node is changed to waiting
// Sensor is now emitting ultrasonnic waves (every 15sec)
// If distance is less than 30 then increment counter else reset counter to 0
// If counter reaches 3 (45sec in total) then change status to occupied