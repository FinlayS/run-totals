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

let accountLink, activeDistance, activePace, activeTime, mainPage, totalDistance, totalPace, totalTime

const elementContainers = async () => {
  accountLink = screen.getByRole("button", { name: "Account" });
  activeDistance = screen.getAllByTestId("active-distance");
  activePace = screen.getAllByTestId("active-pace");
  activeTime = screen.getAllByTestId("active-time");
  totalDistance = screen.getAllByTestId("total-distance");
  totalPace = screen.getAllByTestId("total-pace");
  totalTime = screen.getAllByTestId("total-time");
};

describe("Runs Main: Initial render", () => {
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

  it("should display correct totals", async () =>{
    await elementContainers()
    expect(totalDistance[0]).toHaveTextContent("1.4 Miles")
  })
})