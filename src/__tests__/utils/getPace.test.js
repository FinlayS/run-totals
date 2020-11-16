import { getPace } from '../../utils/getPace'

describe("getPace: should calculate pace from time and distance", () => {
  test('should return pace as time for one mile', () => {
    expect(getPace('00:09:10', 1)).toBe("00:09:10");
  })

  test('should return 9 minute mile pace for 9 mins to complete 1 mile', () => {
    expect(getPace('00:09:00', 1)).toBe("00:09:00");
  })

  test('should return 9 minute mile pace for 4.5 mins to complete 0.5 mile', () => {
    expect(getPace('00:04:30', .5)).toBe("00:09:00");
  })

  test('should return 9 minute mile pace for 54 secs to complete 0.1 mile', () => {
    expect(getPace('00:00:54', .1)).toBe("00:09:00");
  })

  test('should return 0 minute mile pace for 0 time to complete 1 mile', () => {
    expect(getPace('00:00:00', 1)).toBe('00:00:00');
  })

  test('should return pace when distance is a string', () => {
    expect(getPace('00:08:00', '1')).toBe('00:08:00');
  })

  test('should return return average pace for marathon record', () => {
    expect(getPace('01:59:40', 26.2)).toBe('00:04:34');
  })

  test('should return undefined when distance is not passed', () => {
    expect(getPace('00:90:00',)).toBe(undefined);
  })

  test('should return undefined when time is not passed', () => {
    expect(getPace('', 1)).toBe(undefined);
  })
})