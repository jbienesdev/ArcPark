<template>
  <div class="container my-3 flex justify-center">
    <div class="mb-4 md:w-1/4">
      <label class="block text-grey text-xs font-bold mb-2 uppercase" for="username">
        Check out vehicle
      </label>
      <div class="relative">
        <div @click="checkOutVehicle" class="circle absolute absol cursor-pointer flex justify-center items-center p-2 bg-red-light rounded-full hover:bg-red-lighter">
          <i class="fa fa-arrow-right text-white"></i>
        </div>
        <input v-model.trim="areaNumber" class="pl-5 pr-10 shadow-md text-base font-bold rounded-full w-full py-2 px-3 text-red-lighter bg-red leading-tight uppercase" id="username" type="text" placeholder="Area Number">
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
export default {
  data() {
    return {
      areaNumber: ''
    }
  },
  methods: {
    checkOutVehicle () {
      if(this.areaNumber) {
        db.ref('parking_area').once('value', snap => {
          let parkingAreas = []
          snap.forEach(childSnap => {
            parkingAreas.push({
              key: childSnap.key,
              ...childSnap.val()
            })
          })
          // Callback function to make a certain parking area to be available.
          let result = this.checkIfOccupied(parkingAreas, oneParkingArea => {
            db.ref(`parking_area/${oneParkingArea.key}`).set({
              counter: 1,
              lat: oneParkingArea.lat,
              lng: oneParkingArea.lng,
              status: 'available'
            }).then(() => {
              this.areaNumber = '' //Delete area number field after
              this.$notify({
                type: 'success',
                title: 'Success!',
                text: `Area ${oneParkingArea.key} is now available.`
              })
            })
          })

          if(!result.status) {
            this.$notify({
              type: 'error',
              title: 'Error',
              text: result.message
            })
          }
        })
      } else { //If no input
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly enter an area number'
        })
      }
    },
    checkIfOccupied(parkingAreas, editDataToFireabse) {
      let areaNumberIsFoundHolder = parkingAreas.filter(parkingArea => parkingArea.key === this.areaNumber)
      if (!areaNumberIsFoundHolder.length) {
        return {
          message: 'Area number not found.',
          status: false
        }
      }

      if(areaNumberIsFoundHolder[0].status === 'occupied') {
        return editDataToFireabse(areaNumberIsFoundHolder[0])
      } else {
        return {
          message: 'The parking area is not yet occupied.',
          status: false
        }
      }
    },
  }
}
</script>

<style scoped>
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
.absol {
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
}
.circle {
  width: 30px;
  height: 30px;
}
</style>
