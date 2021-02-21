import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "../../pages/login";
import { userLogin } from "../../api/user";

jest.mock("../../api/user", () => ({ userLogin: jest.fn() }));

let emailInput, loginPage, passwordInput, loginButton;

const validEmailInput = "valid@email.com";
const validPasswordInput = "validPassw0rd";
const invalidLoginMessage = "login attempt is invalid"

const elementContainers = async () => {
  emailInput = screen.getByTestId("email-input");
  passwordInput = screen.getByTestId("password-input");
  loginButton = screen.getByRole("button", { name: "Login" });
};

describe("Login page tests", () => {
  beforeEach(async () => {
    await act(async () => {
      loginPage = render(<Login />);
      await elementContainers()
    });
  })

  describe("Page Render", () => {
    it("should show email share message", async () => {
      expect(screen.getByText("We'll never share your email with anyone else."))
        .toBeInTheDocument();
    })

    it("should render elements", async () => {
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    })

    it("should render placeholder text", async () => {
      expect(screen.getAllByPlaceholderText("Enter email"))
        .toBeTruthy()
      expect(screen.getAllByPlaceholderText("Password"))
        .toBeTruthy()
    })

    it("should render disabled login button", async () => {
      expect(loginButton).toBeDisabled();
    })

    it("should not render alerts", async () => {
      expect(screen.queryAllByRole("alert")).toStrictEqual([])
    })
  })

  describe("Client side validation", () => {
    it("should show empty email warning", async () => {
      userEvent.type(passwordInput, validPasswordInput)
      await act(async () => fireEvent.blur(emailInput))

      expect(
        screen.getByText("Please enter an email address")
      ).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    })

    it("should show invalid email warning", async () => {
      userEvent.type(passwordInput, validPasswordInput)
      userEvent.type(emailInput, "invalid@email")
      await act(async () => fireEvent.blur(emailInput))

      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    })

    it("should show empty password warning", async () => {
      userEvent.type(emailInput, validEmailInput)
      await act(async () => fireEvent.blur(passwordInput))
      expect(
        screen.getByText("Please enter a valid password")
      ).toBeInTheDocument();

      expect(loginButton).toBeDisabled();
    })

    it("should show password too short warning", async () => {
      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, "invalid")
      await act(async () => fireEvent.blur(passwordInput))

      expect(
        screen.getByText("Must be at least 8 characters")
      ).toBeInTheDocument();

      expect(loginButton).toBeDisabled();
    })

    it("should enable login button with valid input", async () => {
      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      expect(loginButton).toBeEnabled()
    })
  })

  describe("Server side validation", () => {
    beforeEach(() => {
      userLogin.mockReset();
    })
    it("should call login function", async () => {
      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      await act(async () => userEvent.click(loginButton))

      expect(userLogin).toBeCalledTimes(1)
      expect(userLogin).toBeCalledWith(
        {
          "email": validEmailInput,
          "password": validPasswordInput
        }
      )
    })

    it("should show general error message", async () => {
      userLogin.mockRejectedValue();

      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      await act(async () => userEvent.click(loginButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent("Sorry, something went wrong")
    })

    it("should show server error message", async () => {
      userLogin.mockResolvedValueOnce({
        response: {
          status: 401,
          data: {
            error:
              { message: invalidLoginMessage }
          }
        }
      });

      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      await act(async () => userEvent.click(loginButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent(invalidLoginMessage)
    })

    it("should clear server error on re-input", async () => {
      userLogin.mockResolvedValueOnce({
        response: {
          status: 401,
          data: {
            error:
              { message: invalidLoginMessage }
          }
        }
      });

      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      await act(async () => userEvent.click(loginButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent(invalidLoginMessage)

      userEvent.type(emailInput, validEmailInput)
      expect(
        screen.queryByText(invalidLoginMessage)
      ).not.toBeInTheDocument()
    })

    it("should show spinner when logging in", async () => {
      jest.useFakeTimers();

      userLogin.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve()))
      );

      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)

      await act(async () => userEvent.click(loginButton))

      expect(
        screen.getByTestId("loader")
      ).toBeInTheDocument();
    })

    it("should not show spinner when login resolves", async () => {
      userLogin.mockResolvedValueOnce({
         status: 200
      });

      userEvent.type(emailInput, validEmailInput)
      userEvent.type(passwordInput, validPasswordInput)
      await act(async () => userEvent.click(loginButton))

      expect(
        screen.queryAllByTestId("loader")
      ).toStrictEqual([])
    })
  })
})
