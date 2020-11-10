import { timeInSeconds } from "../../utils/timeInSeconds";

test('should return seconds for 12 hours', () => {
  expect(timeInSeconds("12")).toBe(43200)
})

test('should calculate any number of hours', () => {
  expect(timeInSeconds("1201")).toBe(4323600)
})

test('should calculate HH:MM after split', () => {
  expect(timeInSeconds("12:01")).toBe(43260)
})

test('should calculate HH:MM:SS after split', () => {
  expect(timeInSeconds("12:01:00")).toBe(43260)
})

test('should add SS to results', () => {
  expect(timeInSeconds("12:01:01")).toBe(43261)
})

test('should calculate MM:SS only', () => {
  expect(timeInSeconds("00:01:01")).toBe(61)
})

test('should calculate SS only', () => {
  expect(timeInSeconds("00:00:51")).toBe(51)
})

test('HH, MM, SS can be more than 2 digits', () => {
  expect(timeInSeconds("100:100:100")).toBe(366100)
})

test('should return 0 for empty string', () => {
  expect(timeInSeconds("")).toBe(0)
})

test('should return 0 for undefined', () => {
  expect(timeInSeconds()).toBe(0)
})