import { timeInputFormat } from '../../utils/timeInputFormat'

describe("timeInputFormat: should format input as time string", () => {
  test('should add HH, MM & SS values', () => {
    expect(timeInputFormat("042010")).toBe("04:20:10");
  })

  test('should limit MM & SS to 59', () => {
    expect(timeInputFormat("056060")).toBe("05:59:59");
  })

  test('should limit HH to 99', () => {
    expect(timeInputFormat("994545")).toBe("99:45:45");
  })

  test('should return first 6 digits only', () => {
    expect(timeInputFormat("123456789")).toBe("12:34:56");
  })

  test('should return HH only as full time', () => {
    expect(timeInputFormat("45")).toBe("45:00:00");
  })

  test('should return HH & MM only as full time', () => {
    expect(timeInputFormat("4512")).toBe("45:12:00");
  })
})
