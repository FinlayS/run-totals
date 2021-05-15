import React from "react";
import { act, render, screen } from "@testing-library/react"
import RunsMain from "../../../pages/runs-main";
import { getRuns } from "../../../api/runs";
import { getLaps} from "../../../api/laps";
import get_runs from "../../../__mocks__/getRuns.json"
import get_lap_0 from "../../../__mocks__/getLaps_0.json"
import get_lap_1 from "../../../__mocks__/getLaps_1.json"

jest.mock("../../../api/runs", () => ({ getRuns: jest.fn() }));
jest.mock("../../../api/laps", () => ({ getLaps: jest.fn() }));

let addRun, accountNavigation, accountLink, activeDistance, activePace, activeTime, header, mainPage, showLapsToggle,
  totalDistance, totalPace, totalTime

const elementContainers = async () => {
  // Header
  header = screen.getByRole("navigation")
  accountLink = screen.getByRole("button", { name: "Account" });
  accountNavigation = screen.getByRole("button", { name: "Toggle navigation" });
  addRun = screen.getByRole("button", { name: "Add run" });

  //Laps
  showLapsToggle = screen.getAllByTestId( "expand-collapse-toggle")
  // edit lap button { name: "Edit Lap" }
  // add lap button { name: "+ lap }

  // Page totals
  activeDistance = screen.getAllByTestId("active-distance");
  activePace = screen.getAllByTestId("active-pace");
  activeTime = screen.getAllByTestId("active-time");
  totalDistance = screen.getAllByTestId("total-distance");
  totalPace = screen.getAllByTestId("total-pace");
  totalTime = screen.getAllByTestId("total-time");
};

describe("Runs Main: Add first run", () => {
  it("should match snapshot for empty page", async () => {
    jest.resetAllMocks()
    getRuns.mockResolvedValueOnce([])
    await act(async () => {
      mainPage = render(<RunsMain/>);
    });
    expect(mainPage).toMatchSnapshot()
  })
})

describe("Runs Main: Returning user", () => {
  beforeEach(async () => {
    jest.resetAllMocks()
    getRuns.mockResolvedValueOnce(get_runs)
    getLaps.mockResolvedValueOnce(get_lap_0)
    getLaps.mockResolvedValueOnce(get_lap_1)
    await act(async () => {
      mainPage = render(<RunsMain/>);
    });
  })

  it("should match snapshot", () => {
    expect(mainPage).toMatchSnapshot()
  })

  it("should get all runs on page load", () => {
    expect(getRuns).toHaveBeenCalledTimes(1)
  })

  it("should get all laps for each run on page load", () => {
    expect(getLaps).toHaveBeenCalledTimes(2)
  })

  it("should display correct totals for run 1", async () =>{
    await elementContainers()
    expect(totalTime[0]).toHaveTextContent("00:05:45")
    expect(totalDistance[0]).toHaveTextContent("1.4 Miles")
    expect(totalPace[0]).toHaveTextContent("00:04:06")
  })

  it("should display correct 'active' totals for run 1", async () =>{
    await elementContainers()
    expect(activeTime[0]).toHaveTextContent("00:05:45")
    expect(activeDistance[0]).toHaveTextContent("1.4 Miles")
    expect(activePace[0]).toHaveTextContent("00:04:06")
  })

  it("should display correct totals for run 2", async () =>{
    await elementContainers()
    expect(totalTime[1]).toHaveTextContent("00:13:15")
    expect(totalDistance[1]).toHaveTextContent("6.8 Miles")
    expect(totalPace[1]).toHaveTextContent("00:01:57")
  })

  it("should display correct 'active' totals for run 2", async () =>{
    await elementContainers()
    expect(activeTime[1]).toHaveTextContent("00:03:03")
    expect(activeDistance[1]).toHaveTextContent("0.8 Miles")
    expect(activePace[1]).toHaveTextContent("00:03:49")
  })
})
