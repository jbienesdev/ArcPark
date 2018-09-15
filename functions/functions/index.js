const functions = require('firebase-functions')
const admin = require('firebase-admin')
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

      // increment before sending to db in order to foresee if counter is already at maximum
      // counter++

      if(counter === 3) {
        change.after.ref.parent.child('status').set('unavailable')
        change.after.ref.parent.child('counter').set(1)
      } else {
        change.after.ref.parent.child('counter').set(counter + 1)
      }
    })
  })
  
// Status node is changed to waiting
// Sensor is now emitting ultrasonnic waves (every 15sec)
// If distance is less than 30 then increment counter else reset counter to 0
// If counter reaches 3 (45sec in total) then change status to unavailable