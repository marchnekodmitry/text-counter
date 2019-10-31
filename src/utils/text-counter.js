export const getPrice = (count, language, modifier = 1) => {
  const pricePerCharacter = language === 'en' ? 0.12 : 0.05
  const totalPrice = (pricePerCharacter * count * modifier).toFixed(2)

  if (language === 'en') {
    return totalPrice < 120 ? 120 : totalPrice
  }
  return totalPrice < 50 ? 50 : totalPrice
}

export const getTime = (count, language, modifier = 1) => {
  const millisecondsInMinute = 60000
  // Киевское время
  const currentTime = new Date((Date.now() + (new Date()).getTimezoneOffset() * millisecondsInMinute + 120 * millisecondsInMinute))
  count *= modifier

  const day = {
    start: 10,
    end: 19
  }

  let endTime = new Date(currentTime.getTime());
  let workHours = Math.ceil(count / (language === 'en' ? 333 : 1333))

  while (workHours !== 0) {
    if (endTime.getDay() === 0 || endTime.getDay() === 6) {
      endTime.setDate(endTime.getDate() + 1)
      continue
    }
    const hoursLeft = day.end - endTime.getHours() - (endTime.getMinutes() === 0 ? 0 : 1)
    if (workHours > hoursLeft) {
      workHours = workHours - (day.end - endTime.getHours())
      endTime.setDate(endTime.getDate() + 1)
      endTime.setHours(day.start)
    } else {
      endTime.setHours(endTime.getHours() + workHours)
      workHours = 0
    }
  }

  return endTime
}

export const transformDate = (date) => {
  return `${date.toLocaleDateString()} в ${date.getHours()}:${date.getMinutes()}`
}
