export const getPrice = ({ count, language, modifier = 1 }) => {
  const pricePerCharacter = language === 'en' ? 0.12 : 0.05
  const totalPrice = Math.floor(pricePerCharacter * count * modifier * 100) / 100

  if (language === 'en') {
    return totalPrice < 120 ? 120 : totalPrice
  }
  return totalPrice < 50 ? 50 : totalPrice
}

export const getWorkHours = ({ count, language, modifier }) => {
  const workHours = count / (language === 'en' ? 333 : 1333)
  const totalHours = workHours * modifier + 0.5
  return totalHours < 1 ? 1 : Math.floor(totalHours * 10) / 10
}

export const getCurrentDate = () => {
  const millisecondsInMinute = 60000
  // Киевское время
  return new Date((Date.now() + (new Date()).getTimezoneOffset() * millisecondsInMinute + 120 * millisecondsInMinute))
}

export const getEndDate = (currentDate, workHours) => {
  const day = {
    start: 10,
    end: 19
  }

  let endDate = new Date(currentDate.getTime());

  while (workHours !== 0) {
    if (endDate.getDay() === 0 || endDate.getDay() === 6) {
      endDate.setDate(endDate.getDate() + 1)
      endDate.setHours(day.start)
      continue
    }
    let hoursLeft = day.end - endDate.getHours() - endDate.getMinutes() / 60
    if (endDate.getHours() < day.start || endDate.getHours() >= day.end) {
      hoursLeft = 0
    }
    if (workHours > hoursLeft) {
      if (endDate.getHours() >= day.start) {
        if (endDate.getHours() < day.end) {
          workHours = workHours - (day.end - endDate.getHours())
        }
        endDate.setDate(endDate.getDate() + 1)
      }
      endDate.setHours(day.start)
    } else {
      endDate.setMinutes(endDate.getMinutes() + workHours * 60)
      workHours = 0
    }
  }
  return endDate
}

export const getDateOfCompletion = (count, language, modifier = 1) => {
  return getEndDate(getCurrentDate(), getWorkHours({ count, language, modifier }))
}

export const transformDate = (date) => {
  return `${date.toLocaleDateString()} в ${date.getHours()}:${`${date.getMinutes()}`.padStart(2, '0')}`
}