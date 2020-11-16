import { addTimes } from '../../utils/addTimes'

describe("addTimes: should add 2 times together", () => {
  test('should add HH, MM & SS values', () => {
    expect(addTimes('04:20:10', '21:15:10')).toBe("25:35:20");
  })

  test('should increment HH when MM sum > 60', () => {
    expect(addTimes('04:35:10', '21:35:10')).toBe("26:10:20");
  })

  test('should increment MM when SS sum > 60', () => {
    expect(addTimes('00:00:50', '00:00:51')).toBe("00:01:41");
  })

  test('should increment HH:MM:SS correctly', () => {
    expect(addTimes("00:58:59", "00:01:01")).toBe("01:00:00");
  })

  test('should add with HH:MM only', () => {
    expect(addTimes('30:59', '17:10')).toBe("48:09:00");
  })

  test('should should with HH only', () => {
    expect(addTimes('02', '13')).toBe("15:00:00");
  })

  test('should should add mixed', () => {
    expect(addTimes('00:19:11', '13')).toBe("13:19:11");
  })
})
