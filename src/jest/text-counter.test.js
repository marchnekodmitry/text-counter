import { getPrice, getWorkHours, getEndDate } from '../utils/text-counter'

describe('getPrice', () => {
    test.each`
        count     | language | modifier     | result
        ${1}      | ${'en'}  | ${1}         | ${120}
        ${1}      | ${'ru'}  | ${undefined} | ${50}
        ${1}      | ${'ua'}  | ${1.2}       | ${50}
        ${45000}  | ${'ua'}  | ${1}         | ${2250}
        ${130000} | ${'en'}  | ${undefined} | ${15600}
    `('$count on $language with mod $modifier will be $result', ({ count, language, modifier, result }) => {
        expect(getPrice({ count, language, modifier })).toBe(result)
    })
})

describe('getWorkHours', () => {
    test.each`
        count     | language | modifier  | result
        ${1}      | ${'en'}  | ${1}      | ${1}
        ${1}      | ${'ru'}  | ${1}      | ${1}
        ${1}      | ${'ua'}  | ${1.2}    | ${1}
        ${1000}   | ${'ru'}  | ${1.2}    | ${1.4}
        ${4400}   | ${'en'}  | ${1.2}    | ${16.3}
        ${45000}  | ${'ua'}  | ${1}      | ${34.2}
        ${130000} | ${'en'}  | ${1.2}    | ${468.9}
    `('$count on $language with mod $modifier will take $result', ({ count, language, modifier, result }) => {
        expect(getWorkHours({ count, language, modifier })).toBe(result)
    })
})

describe('getEndDate', () => {
    test.each`
        date                             | hours   | result
        ${new Date(2019, 10, 1, 13, 0)}  | ${3}    | ${new Date(2019, 10, 1, 16, 0)}
        ${new Date(2019, 10, 4, 16, 0)}  | ${10}   | ${new Date(2019, 10, 5, 17, 0)}
        ${new Date(2019, 10, 4, 16, 38)} | ${10}   | ${new Date(2019, 10, 5, 17, 38)}
        ${new Date(2019, 10, 4, 16, 38)} | ${10.3} | ${new Date(2019, 10, 5, 17, 56)}
        ${new Date(2019, 10, 4, 16, 48)} | ${10.3} | ${new Date(2019, 10, 5, 18, 6)}
        ${new Date(2019, 10, 4, 19, 0)}  | ${10}   | ${new Date(2019, 10, 6, 11, 0)}
        ${new Date(2019, 10, 1, 8, 0)}   | ${6}    | ${new Date(2019, 10, 1, 16, 0)}
        ${new Date(2019, 10, 5, 8, 0)}   | ${16}   | ${new Date(2019, 10, 6, 17, 0)}
        ${new Date(2019, 10, 1, 8, 0)}   | ${16}   | ${new Date(2019, 10, 4, 17, 0)}
        ${new Date(2019, 10, 6, 20, 0)}  | ${6}    | ${new Date(2019, 10, 7, 16, 0)}
        ${new Date(2019, 10, 6, 20, 0)}  | ${16}   | ${new Date(2019, 10, 8, 17, 0)}
        ${new Date(2019, 10, 2, 20, 0)}  | ${16}   | ${new Date(2019, 10, 5, 17, 0)}
        ${new Date(2019, 10, 3, 20, 0)}  | ${4}    | ${new Date(2019, 10, 4, 14, 0)}
        ${new Date(2019, 10, 5, 23, 0)}  | ${8}    | ${new Date(2019, 10, 6, 18, 0)}
        ${new Date(2019, 10, 5, 1, 0)}   | ${8}    | ${new Date(2019, 10, 5, 18, 0)}
        ${new Date(2019, 10, 1, 16, 10)} | ${2.35} | ${new Date(2019, 10, 1, 18, 31)}
        ${new Date(2019, 10, 1, 16, 10)} | ${6.3}  | ${new Date(2019, 10, 4, 13, 28)}
    `('received at $date done in $hours at $result', ({ date, hours, result }) => {
        expect(getEndDate(date, hours)).toEqual(result)
    })
})
