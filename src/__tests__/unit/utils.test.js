import {splitAmtOnDecimal, roundToFixedNum} from 'Utils';

describe('splitAmtOnDecimal fcn works as intended', () => {
    
    test('fcn returns an array of length 2; each filled with strings', () => {
        expect(typeof splitAmtOnDecimal(1.454)[0]).toEqual('string');
        expect(typeof splitAmtOnDecimal(1.454)[1]).toEqual('string');
    });
  
    test('Splits floating number into before and after decimal', () => {
        expect(splitAmtOnDecimal(1.454)).toEqual(['1', '454']);
    });

    test('splits whole numbers into [someval, emptyString]', () => {
        expect(splitAmtOnDecimal(1.00000)).toEqual(['1', '']);
    })

    test('Splits float correctly when < 1 but > 0', () => {
        expect(splitAmtOnDecimal(0.1223)).toEqual(['0', '1223']);
    })

    test('Splits float correctly when is 0', () => {
        expect(splitAmtOnDecimal(0)).toEqual(['0', '']);
        expect(splitAmtOnDecimal(0.000)).toEqual(['0', '']);
    })

  });

  describe('roundToFixedNum fcn works as intended', () => {
      test('Basic Round check', () => {
          expect(roundToFixedNum(1.005, 2)).toBe(1.01.toString())
      })

    test('Rounds to entended length', () => {
        expect(roundToFixedNum(1.000049, 5)).toBe(1.00005.toString())
    })

    test('Rounds to whole numbers to intended length', () => {
        expect(roundToFixedNum(1, 5)).toEqual('1.00000')
    })

    test('Rounds numbers < 1 but > 0 correctly', () => {
        expect(roundToFixedNum(0.005, 2)).toEqual('0.01')
    })

    test('Rounds 0 to intended length', () => {
        expect(roundToFixedNum(0, 2)).toEqual('0.00')
    })
  })