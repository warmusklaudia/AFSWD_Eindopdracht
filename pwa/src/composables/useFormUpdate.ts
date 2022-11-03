import { reactive, readonly, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthentication from './useAuthentication'

const { user } = useAuthentication()

const currentStep = ref(1)
const amountDays = ref(0)
const addBreakfast = ref(false)

const reservationFormInput = reactive({
  userId: user.value!.uid,
  rooms: 0,
  amountAdults: 0,
  amountChildren: 0,
  price: 0,
  reservationStartDate: new Date().toISOString().slice(0, 10),
  reservationEndDate: '',
})

const selectedRoom = reactive({
  id: '',
  name: '',
  description: '',
  rating: 0,
  category: '',
})

export default () => {
  const { push } = useRouter()

  const setSelectedRoom = (room: any) => {
    selectedRoom.id = room.id
    selectedRoom.name = room.name
    selectedRoom.description = room.description
    selectedRoom.rating = room.rating
    selectedRoom.category = room.category
    console.log(selectedRoom)
  }

  const setReservationStartDate = (date: string) => {
    reservationFormInput.reservationStartDate = date
    console.log(reservationFormInput)
  }

  const setEndDate = (e: Event) => {
    //setEnDate sets the end date to the start date + the amount of days the user has entered
    amountDays.value = +(e.target as HTMLInputElement).value
    const endDate = new Date(reservationFormInput.reservationStartDate)
    endDate.setDate(endDate.getDate() + amountDays.value)
    reservationFormInput.reservationEndDate = endDate
      .toISOString()
      .split('T')[0]
  }

  const setAmountAdults = (e: Event) => {
    reservationFormInput.amountAdults = parseInt(
      (e.target as HTMLInputElement).value,
    )
  }

  const setAmountChildren = (e: Event) => {
    reservationFormInput.amountChildren = parseInt(
      (e.target as HTMLInputElement).value,
    )
  }

  const setBreakfast = (e: Event) => {
    addBreakfast.value = (e.target as HTMLInputElement).checked
    console.log(addBreakfast)
  }

  const changeStepTo = (step: number) => {
    console.log(reservationFormInput)
    push('/reservations/add/' + step)
  }

  return {
    currentStep: readonly(currentStep),
    reservationFormInput: readonly(reservationFormInput),
    selectedRoom: readonly(selectedRoom),
    amountDays: readonly(amountDays),
    addBreakfast: readonly(addBreakfast),

    setEndDate,
    setSelectedRoom,
    setAmountAdults,
    setAmountChildren,
    setBreakfast,
    changeStepTo,
  }
}
