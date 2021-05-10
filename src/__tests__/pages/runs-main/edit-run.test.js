import React from "react";
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import RunsMain from "../../../pages/runs-main";
import { deleteRun, getRuns, patchRun } from "../../../api/runs";
import { getLaps } from "../../../api/laps";
import get_runs from "../../../__mocks__/getRuns.json"
import get_lap_0 from "../../../__mocks__/getLaps_0.json"
import get_lap_1 from "../../../__mocks__/getLaps_1.json"
import moment from "moment";

jest.mock("../../../api/runs", () => ({ getRuns: jest.fn(), patchRun: jest.fn(), deleteRun: jest.fn() }));
jest.mock("../../../api/laps", () => ({ getLaps: jest.fn() }));

let  editRunButton, editRunModal, editRunModalTitle, editRunCloseButton, editRunDeleteButton, editRunSaveButton, mainPage, runDateInput, runDescriptionInput

const date = moment().format("DD/MM/YY")
const nextYear = moment(date, "DD/MM/YY")
  .add(1, 'year')
  .format("DD/MM/YY")

const editRunButtonContainer = async () => {
  editRunButton = screen.getAllByRole("button", { name: "Edit Run" });
}

const elementContainers = async () => {
  editRunModal =  screen.getByTestId( "edit-run-modal")
  editRunModalTitle = screen.queryByText( "Edit this run")
  editRunCloseButton = screen.getByTestId("edit-run-close-button")
  editRunDeleteButton = screen.getByTestId("edit-run-delete-button")
  editRunSaveButton = screen.getByTestId("edit-run-save-button")
  runDescriptionInput = screen.getByTestId("edit-run-description-input")
  runDateInput = screen.getByTestId("edit-run-date-input")

};

const openEditModal = async () => {
  await editRunButtonContainer()
  await act(async () =>
    userEvent.click(editRunButton[0])
  )
  await elementContainers()
}

describe("Runs Main: Edit run", () => {
  beforeEach(async () => {
    jest.resetAllMocks()
    getRuns.mockResolvedValueOnce(get_runs)
    getLaps.mockResolvedValueOnce(get_lap_0)
    getLaps.mockResolvedValueOnce(get_lap_1)
    await act(async () => {
      mainPage = render(<RunsMain/>);
    });
  })

  it("'Edit Run' modal is not visible by default", async () => {
    await editRunButtonContainer()

    expect(screen.queryByText( "Edit this run")).not.toBeInTheDocument()
  })

  it("should open 'Edit Run' modal", async () => {
    await openEditModal()

    expect(editRunModal).toBeInTheDocument()
    expect(editRunModalTitle).toBeInTheDocument()
  })

  it("can close the open modal", async () => {
    await openEditModal()
    await act(async () =>
      userEvent.click(editRunCloseButton)
    )

    expect(editRunModalTitle).not.toBeInTheDocument()
  })

  it("can edit the run description", async () => {
    await openEditModal()
    userEvent.type(runDescriptionInput, " updated")

    expect(runDescriptionInput).toHaveValue("top run updated")
  })

  it("can edit the run date", async () => {
    await openEditModal()
    userEvent.type(runDateInput, `{selectall}${nextYear}`)

    expect(runDateInput).toHaveValue(nextYear)
  })

  it("should call 'patchRun' with the updated description", async () => {
    await openEditModal()
    userEvent.type(runDescriptionInput, " updated")
    await act(async () =>
      userEvent.click(editRunSaveButton)
    )

    expect(patchRun).toBeCalledWith(
      {
        "description": "top run updated",
        "runDate": 1616889600000
      }, "6060a84fc9a9fb486500ee62"
    )
  })

  it("should call 'deleteRun'", async () => {
    window.confirm = jest.fn(() => true) // always click 'yes'
    await openEditModal()
    await act(async () =>
      userEvent.click(editRunDeleteButton)
    )

    expect(deleteRun).toBeCalledWith("6060a84fc9a9fb486500ee62")
  })
})
