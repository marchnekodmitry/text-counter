import { getPrice, getWorkHours, getEndDate } from '../utils/text-counter'
import * as chai from 'chai'
import * as chaiDatetime from 'chai-datetime'

const { expect } = chai
chai.use(chaiDatetime)

describe('getPrice', () => {
    it('should return price', () => {
        const test = [
            {
                count: 1,
                language: 'en',
                modifier: 1
            },
            {
                count: 1,
                language: 'ru',
                modifier: 1
            },
            {
                count: 1,
                language: 'ua',
                modifier: 1.2
            },
            {
                count: 45678,
                language: 'en',
                modifier: 1
            },
            {
                count: 50480,
                language: 'ru',
                modifier: 1.2
            }
        ]

        expect(getPrice(test[0])).to.equal(120)
        expect(getPrice(test[1])).to.equal(50)
        expect(getPrice(test[2])).to.equal(50)
        expect(getPrice(test[3])).to.equal(5481.36)
        expect(getPrice(test[4])).to.equal(3028.8)
    })
})

describe('getWorkHours', () => {
    it('should return work hours', () => {
        const test = [
            {
                count: 1,
                language: 'en',
                modifier: 1
            },
            {
                count: 1,
                language: 'ru',
                modifier: 1
            },
            {
                count: 1,
                language: 'ua',
                modifier: 1.2
            },
            {
                count: 100,
                language: 'en',
                modifier: 1
            },
            {
                count: 100,
                language: 'ru',
                modifier: 1
            },
            {
                count: 100,
                language: 'ru',
                modifier: 1.2
            },
            {
                count: 333,
                language: "ru",
                modifier: 1.2
            },
            {
                count: 333,
                language: "en",
                modifier: 1
            },
            {
                count: 333,
                language: 'en',
                modifier: 1.2
            },
            {
                count: 1000,
                language: 'en',
                modifier: 1
            },
            {
                count: 1000,
                language: 'ru',
                modifier: 1.2
            },
            {
                count: 1333,
                language: 'ua',
                modifier: 1
            },
            {
                count: 1333,
                language: 'ua',
                modifier: 1.2
            },
            {
                count: 1333,
                language: 'en',
                modifier: 1
            },
            {
                count: 45678,
                language: 'en',
                modifier: 1
            },
            {
                count: 50480,
                language: 'ru',
                modifier: 1.2
            },
            {
                count: 133000,
                language: 'ua',
                modifier: 1
            }
        ]

        expect(getWorkHours(test[0])).to.equal(1)
        expect(getWorkHours(test[1])).to.equal(1)
        expect(getWorkHours(test[2])).to.equal(1)
        expect(getWorkHours(test[3])).to.equal(1)
        expect(getWorkHours(test[4])).to.equal(1)
        expect(getWorkHours(test[5])).to.equal(1)
        expect(getWorkHours(test[6])).to.equal(1)
        expect(getWorkHours(test[7])).to.equal(1.5)
        expect(getWorkHours(test[8])).to.equal(1.7)
        expect(getWorkHours(test[9])).to.equal(3.5)
        expect(getWorkHours(test[10])).to.equal(1.4)
        expect(getWorkHours(test[11])).to.equal(1.5)
        expect(getWorkHours(test[12])).to.equal(1.7)
        expect(getWorkHours(test[13])).to.equal(4.5)
        expect(getWorkHours(test[14])).to.equal(137.6)
        expect(getWorkHours(test[15])).to.equal(45.9)
        expect(getWorkHours(test[16])).to.equal(100.2)
    })
})

describe('getEndDate', () => {
    it('should return date', () => {
        const test = [
            {// на неделе / в рабочее время / можно выполнить до конца дня
                start: new Date(2019, 10, 1, 13, 0),
                hours: 3,
                end: new Date(2019, 10, 1, 16, 0)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня
                start: new Date(2019, 10, 4, 16, 0),
                hours: 10,
                end: new Date(2019, 10, 5, 17, 0)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня / с минутами
                start: new Date(2019, 10, 4, 16, 38),
                hours: 10,
                end: new Date(2019, 10, 5, 17, 38)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня / часы с минутами
                start: new Date(2019, 10, 4, 16, 38),
                hours: 10.3,
                end: new Date(2019, 10, 5, 17, 56)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня / часы с минутами / с переходом на час
                start: new Date(2019, 10, 4, 16, 48),
                hours: 10.3,
                end: new Date(2019, 10, 5, 18, 16)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня /  в час окончания дня
                start: new Date(2019, 10, 4, 19, 0),
                hours: 10,
                end: new Date(2019, 10, 6, 11, 0)
            },
            {// на неделе / в рабочее время / нельзя выполнить до конца дня / с выходными
                start: new Date(2019, 10, 1, 16, 0),
                hours: 10,
                end: new Date(2019, 10, 4, 17, 0)
            },
            {// на неделе / раньше чем рабочее время / можно выполнить до конца дня
                start: new Date(2019, 10, 1, 8, 0),
                hours: 6,
                end: new Date(2019, 10, 1, 16, 0)
            },
            {// на неделе / раньше чем рабочее время / нельзя выполнить до конца дня
                start: new Date(2019, 10, 5, 8, 0),
                hours: 16,
                end: new Date(2019, 10, 6, 17, 0)
            },
            {// на неделе / раньше чем рабочее время / нельзя выполнить до конца дня / с выходными
                start: new Date(2019, 10, 1, 8, 0),
                hours: 16,
                end: new Date(2019, 10, 4, 17, 0)
            },
            {// на неделе / позже чем рабочее время / можно выполнить до конца дня
                start: new Date(2019, 10, 6, 20, 0),
                hours: 6,
                end: new Date(2019, 10, 7, 16, 0)
            },
            {// на неделе / позже чем рабочее время / нельзя выполнить до конца дня
                start: new Date(2019, 10, 6, 20, 0),
                hours: 16,
                end: new Date(2019, 10, 8, 17, 0)
            },
            {// на неделе / позже чем рабочее время / нельзя выполнить до конца дня / с выходными
                start: new Date(2019, 10, 1, 20, 0),
                hours: 16,
                end: new Date(2019, 10, 5, 17, 0)
            },
            {// на выходных / нельзя выполнить до конца дня
                start: new Date(2019, 10, 2, 20, 0),
                hours: 16,
                end: new Date(2019, 10, 5, 17, 0)
            },
            {// на выходных / можно выполнить до конца дня
                start: new Date(2019, 10, 3, 20, 0),
                hours: 4,
                end: new Date(2019, 10, 4, 14, 0)
            },
            {// на неделе / ночью в 23
                start: new Date(2019, 10, 5, 23, 0),
                hours: 8,
                end: new Date(2019, 10, 6, 18, 0)
            },
            {// на неделе / ночью в 1
                start: new Date(2019, 10, 5, 1, 0),
                hours: 8,
                end: new Date(2019, 10, 5, 18, 0)
            },
            {// на неделе / можно выполнить до конца дня / с минутами
                start: new Date(2019, 10, 1, 16, 10),
                hours: 2.35,
                end: new Date(2019, 10, 1, 18, 45)
            },
            {// на неделе / нельзя выполнить до конца дня / с минутами / с выходными
                start: new Date(2019, 10, 1, 16, 10),
                hours: 6.3,
                end: new Date(2019, 10, 4, 13, 28)
            },
        ]

        test.forEach((test, i) => {
            try {
                expect(getEndDate(test.start, test.hours)).to.equalDate(test.end)
            } catch (e) {
                console.error(`at test[${i}]`)
                throw e
            }

        })
    })
})