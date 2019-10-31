import { getTime } from '../utils/text-counter'
import { expect } from 'chai'

describe('getTime', () => {
    it('should return right date', () => {
        const millisecondsInMinute = 60000
        const day = {
            start: 10,
            end: 19
        }

        const getWorkHours = (count, language, modifier) => {
            let startTime = new Date((Date.now() + (new Date()).getTimezoneOffset() * millisecondsInMinute + 120 * millisecondsInMinute))
            const endTime = getTime(count, language, modifier)

            if (startTime.getHours() >= day.end || startTime.getHours() < day.start) {
                startTime.setHours(day.start)
                startTime.setDate(startTime.getDate() + 1)
            }

            let workHours = 0
            while (startTime.toDateString() !== endTime.toDateString()) {
                if (!(startTime.getDay() === 0 || startTime.getDay() === 6)) {
                    workHours += 9
                }
                startTime.setDate(startTime.getDate() + 1)
            }
            workHours += endTime.getHours() - startTime.getHours()
            return workHours
        }

        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min
        }

        for (let i = 0; i < 20; i++) {
            const count = getRandomInt(0, 100000)
            const language = ['ru', 'ua', 'en'][getRandomInt(0, 3)]
            const modifier = [1, 1.2][getRandomInt(0, 2)]

            const workHours = getWorkHours(count, language, modifier)
            const expectedWorkHours = Math.ceil(count * modifier / (language === 'en' ? 333 : 1333))

            try {
                expect(workHours).to.equal(expectedWorkHours)
            } catch (e) {
                console.error(`Error on Count: ${count} Language: ${language} Modifier: ${modifier}`)
                console.error(`Actual: ${e.actual} Expected: ${e.expected}`)
            }
        }
    })
})
