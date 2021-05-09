import React from "react";
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import RunsMain from "../../../pages/runs-main";
import { getRuns } from "../../../api/runs";

jest.mock("../../../api/runs", () => ({ getRuns: jest.fn(), deleteRun: jest.fn() }));
jest.mock("../../../api/laps", () => ({ getLaps: jest.fn() }));

let addRunButton, mainPage

const addRunButtonContainer = async () => {
  addRunButton = screen.getByRole("button", { name: "Add run" });
}

describe("Runs Main: Add first run", () => {
  beforeEach(async () => {
    jest.resetAllMocks()
    getRuns.mockResolvedValueOnce([])
    await act(async () => {
      mainPage = render(<RunsMain/>);
    });
    await addRunButtonContainer()
  })

  it("should match snapshot for empty page", () => {
    expect(mainPage).toMatchSnapshot()
  })

  it("should open 'Add run' modal", async () => {
    await act(async () =>
      userEvent.click(addRunButton)
    )
  })

})
