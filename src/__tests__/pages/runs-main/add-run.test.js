import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import RunsMain from "../../../pages/runs-main";
import { getRuns, postRun } from "../../../api/runs";
import moment from "moment";

jest.mock("../../../api/runs", () => ({ getRuns: jest.fn(), postRun: jest.fn() }));
jest.mock("../../../api/laps", () => ({ getLaps: jest.fn() }));

let addRunButton, addRunCloseButton, addRunModal, addRunModalTitle, addRunSaveButton, mainPage, runDateInput, runDescriptionInput

const date = moment().format("DD/MM/YY")
const nextYear = moment(date, "DD/MM/YY")
  .add(1, 'year')
  .format("DD/MM/YY")
const runDate = moment(date, "DD/MM/YY").valueOf()
const runDescription = "My first ever run!"

const addRunButtonContainer = async () => {
  addRunButton = screen.getByRole("button", { name: "Add run" });
}

const elementContainers = async () => {
  addRunModal =  screen.getByTestId( "add-run-modal")
  addRunModalTitle = screen.queryByText( "Add a new run")
  addRunCloseButton = screen.getByTestId("add-run-close-button")
  addRunSaveButton = screen.getByTestId("add-run-save-button")
  runDescriptionInput = screen.getByTestId("add-run-description-input")
  runDateInput = screen.getByTestId("add-run-date-input")

};

const openAddRunModal = async () => {
  await addRunButtonContainer()
  await act(async () =>
    userEvent.click(addRunButton)
  )
  await elementContainers()
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
    await openAddRunModal()

    expect(addRunModal).toBeInTheDocument()
    expect(addRunModalTitle).toBeInTheDocument()
  })

  it("can close the open modal", async () => {
    await openAddRunModal()
    await act(async () =>
      userEvent.click(addRunCloseButton)
    )

    expect(addRunModalTitle).not.toBeInTheDocument()
  })

  it("should have today's date as default placeholder", async () => {
    await openAddRunModal()

    expect(runDateInput).toHaveValue(date)
  })

  it("can add the run description", async () => {
    await openAddRunModal()
    userEvent.type(runDescriptionInput, runDescription)

    expect(runDescriptionInput).toHaveValue(runDescription)
  })

  it("should call 'postRun' with run description and default date", async () => {
    await openAddRunModal()
    userEvent.type(runDescriptionInput, runDescription)
    await act(async () =>
      userEvent.click(addRunSaveButton)
    )

    expect(postRun).toBeCalledWith(
      {
        "description": runDescription,
        runDate
      }
    )
  })

  it("should show spinner while saving new run", async () => {
    jest.useFakeTimers()

    postRun.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve()))
    );

    await openAddRunModal()
    userEvent.type(runDescriptionInput, runDescription)
    await act(async () =>
      userEvent.click(addRunSaveButton)
    )

    expect(
      screen.getByTestId("loader")
    ).toBeInTheDocument();
  })

  it("can input another date", async () => {
    await openAddRunModal()
    userEvent.type(runDateInput, `{selectall}${nextYear}`)

    expect(runDateInput).toHaveValue(nextYear)
  })

  it("should show warning for empty description", async () => {
    await openAddRunModal()
    await act(async () => userEvent.click(addRunSaveButton))
    await waitFor(() => screen.getByRole("alert"))

    expect(screen.getByRole("alert"))
      .toHaveTextContent("Please enter a description")
  })

  it("should show warning for empty date input", async () => {
    await openAddRunModal()
    userEvent.type(runDescriptionInput, runDescription)
    userEvent.type(runDateInput, `{selectall} `)
    await act(async () => userEvent.click(addRunSaveButton))

    await waitFor(() => screen.getByRole("alert"))

    expect(screen.getByRole("alert"))
      .toHaveTextContent("Please enter a valid date")
  })

  it("should show warning for invalid date input", async () => {
    await openAddRunModal()
    userEvent.type(runDescriptionInput, runDescription)
    userEvent.type(runDateInput, `{backspace}`)
    await act(async () => userEvent.click(addRunSaveButton))

    await waitFor(() => screen.getByRole("alert"))

    expect(screen.getByRole("alert"))
      .toHaveTextContent("Please enter a valid date")
  })
})
