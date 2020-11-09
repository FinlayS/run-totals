import {getLapTotals} from '../../utils/getTotals'

test('should return blank values with no input', () => {
  expect(getLapTotals([{}, {}])).toStrictEqual({
    "activeDistance": 0,
    "activePace": undefined,
    "activeTime": "",
    "totalDistance": NaN,
    "totalPace": undefined,
    "totalTime": "00:00:00"
  });
})

test('should return correct totals for multiple laps', () => {
  expect(getLapTotals([
    {
      lapActive: false,
      lapDistance: 1,
      lapNo: 1,
      lapTime: "00:09:00"
    }, {
      lapActive: true,
      lapDistance: 1,
      lapNo: 1,
      lapTime: "00:07:00"
    }]))
    .toStrictEqual({
      "activeDistance": 1,
      "activePace": "00:07:00",
      "activeTime": "00:07:00",
      "totalDistance": 2,
      "totalPace": "00:08:00",
      "totalTime": "00:16:00"
    });
})

test('should not return active values with no active laps', () => {
  expect(getLapTotals([
    {
      lapActive: false,
      lapDistance: 1,
      lapNo: 2,
      lapTime: "00:09:00"
    }, {
      lapActive: false,
      lapDistance: 1,
      lapNo: 2,
      lapTime: "00:07:00"
    }]))
    .toStrictEqual({
      "activeDistance": 0,
      "activePace": undefined,
      "activeTime": "",
      "totalDistance": 2,
      "totalPace": "00:08:00",
      "totalTime": "00:16:00"
    });
})

test('should return same times with all active laps', () => {
  expect(getLapTotals([
    {
      lapActive: true,
      lapDistance: 1,
      lapNo: 1,
      lapTime: "00:09:00"
    }, {
      lapActive: true,
      lapDistance: 1,
      lapNo: 2,
      lapTime: "00:07:00"
    }]))
    .toStrictEqual({
      "activeDistance": 2,
      "activePace": "00:08:00",
      "activeTime": "00:16:00",
      "totalDistance": 2,
      "totalPace": "00:08:00",
      "totalTime": "00:16:00"
    });
})

test('should return total times when no distance passed', () => {
  expect(getLapTotals([
    {
      lapActive: true,
      lapDistance: undefined,
      lapNo: 1,
      lapTime: "00:09:00"
    }, {
      lapActive: true,
      lapDistance: undefined,
      lapNo: 2,
      lapTime: "00:07:00"
    }]))
    .toStrictEqual({
      "activeDistance": NaN,
      "activePace": undefined,
      "activeTime": "00:16:00",
      "totalDistance": NaN,
      "totalPace":undefined,
      "totalTime": "00:16:00"
    });
})

test('should return total distance when no time passed', () => {
  expect(getLapTotals([
    {
      lapActive: true,
      lapDistance: 34,
      lapNo: 1,
      lapTime:undefined
    }, {
      lapActive: true,
      lapDistance: 45,
      lapNo: 2,
      lapTime: undefined
    }]))
    .toStrictEqual({
      "activeDistance": 79,
      "activePace": "00:00:00",
      "activeTime": "00:00:00",
      "totalDistance": 79,
      "totalPace": "00:00:00",
      "totalTime": "00:00:00"
    });
})

test('Can return HH values', () => {
  expect(getLapTotals([
    {
      lapActive: true,
      lapDistance: .5,
      lapNo: 1,
      lapTime: "00:45:00"
    }, {
      lapActive: true,
      lapDistance: .5,
      lapNo: 2,
      lapTime: "00:45:00"
    }]))
    .toStrictEqual({
      "activeDistance": 1,
      "activePace": "01:30:00",
      "activeTime": "01:30:00",
      "totalDistance": 1,
      "totalPace": "01:30:00",
      "totalTime": "01:30:00",
    });
})

test('Can return more than 24hrs', () => {
  expect(getLapTotals([
    {
      lapActive: false,
      lapDistance: 40.5,
      lapNo: 1,
      lapTime: "15:45:00"
    }, {
      lapActive: false,
      lapDistance: 40.5,
      lapNo: 2,
      lapTime: "15:45:00"
    }, {
      lapActive: true,
      lapDistance: 76.5,
      lapNo: 3,
      lapTime: "18:45:00"
    }, {
      lapActive: true,
      lapDistance: 76.5,
      lapNo: 4,
      lapTime: "15:45:00"
    }]))
    .toStrictEqual({
      "activeDistance": 153,
      "activePace": "00:13:32",
      "activeTime": "34:30:00",
      "totalDistance": 234,
      "totalPace": "00:16:55",
      "totalTime": "66:00:00",
    });
})