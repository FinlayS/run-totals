import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Register from "../../pages/register";
import { userRegister } from "../../api/user";

jest.mock("../../api/user", () => ({ userRegister: jest.fn() }));

let
  emailInput,
  loginPage,
  passwordInput,
  confirmPasswordInput,
  registerButton,
  loginLink

const validEmailInput = "valid@email.com";
const validPasswordInput = "validPassw0rd";
const invalidRegistrationMessage = "Registration has failed";

const elementContainers = async () => {
  emailInput = screen.getByTestId("email-input");
  passwordInput = screen.getByTestId("password-input");
  confirmPasswordInput = screen.getByTestId("confirmPassword-input");
  registerButton = screen.getByRole("button", { name: "Register" });
  loginLink = screen.getByText("Login here");
};

describe("Register page tests", () => {
  beforeEach(async () => {
    await act(async () => {
      loginPage = render(<Register />);
      await elementContainers()
    });
  })

  describe("Initial Render", () => {
    it("should show email share message", async () => {
      expect(screen.getByText("We'll never share your email with anyone else."))
        .toBeInTheDocument();
    })

    it("should render all elements", async () => {
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument()
      expect(registerButton).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument()
    })

    it("should render placeholder text", async () => {
      expect(screen.getAllByPlaceholderText("Enter email"))
        .toBeTruthy()
      expect(screen.getAllByPlaceholderText("Enter password"))
        .toBeTruthy()
      expect(screen.getAllByPlaceholderText("Confirm password"))
        .toBeTruthy()
    })

    it("should render disabled register button", async () => {
      expect(registerButton).toBeDisabled();
    })

    it("should not render alerts", async () => {
      expect(screen.queryAllByRole("alert")).toStrictEqual([])
    })
  })

  describe("Client side validation", () => {
    it("should show empty email warning", async () => {
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => fireEvent.blur(emailInput))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert")).toHaveTextContent("Please enter an email address")
      expect(registerButton).toBeDisabled();
    })

    it("should show invalid email warning", async () => {
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(emailInput, "invalid@email"))

      await act(async () => fireEvent.blur(emailInput))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert")).toHaveTextContent("Please enter a valid email address")
      expect(registerButton).toBeDisabled();
    })

    it("should show empty password warning", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))

      await act(async () => fireEvent.blur(passwordInput))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert")).toHaveTextContent("Please enter a password")
      expect(registerButton).toBeDisabled();
    })

    it("should show password invalid warning", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, "invalid"))

      await act(async () => fireEvent.blur(passwordInput))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert")).toHaveTextContent("Must Contain 8 characters, one uppercase and one number")
      expect(registerButton).toBeDisabled();
    })

    it("should show empty confirm password warning", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))

      await act(async () => fireEvent.blur(confirmPasswordInput))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert")).toHaveTextContent("Please confirm your password")
      expect(registerButton).toBeDisabled();
    })

    it("should enable login button with valid input", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      expect(registerButton).toBeEnabled()
    })
  })

  describe("Server side validation", () => {
    beforeEach(() => {
      userRegister.mockReset();
    })
    it("should call login function", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))

      expect(userRegister).toBeCalledTimes(1)
      expect(userRegister).toBeCalledWith(
        {
          "email": validEmailInput,
          "password": validPasswordInput
        }
      )
    })

    it("should show general error message", async () => {
      userRegister.mockRejectedValue();

      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent("Sorry, something went wrong")
    })

    it("should show server error message", async () => {
      userRegister.mockResolvedValueOnce({
       response: {
         status: 400,
         data:
           {
             error:
               {message: invalidRegistrationMessage}
           }
        }
      });

      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent(invalidRegistrationMessage)
    })

    it("should clear server error on re-input of valid entry", async () => {
        userRegister.mockResolvedValueOnce({
        response: {
          status: 400,
          data: {
            error:
              { message: invalidRegistrationMessage }
          }
        }
      });

      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))
      await waitFor(() => screen.getByRole("alert"))

      await act(async () => userEvent.type(emailInput, '{backspace}m'))

      expect(screen.queryAllByRole("alert"))
        .toStrictEqual([])
    })

    it("should show password confirmation message", async () => {
      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, "bob"))

      await act(async () => userEvent.click(registerButton))
      await waitFor(() => screen.getByRole("alert"))

      expect(screen.getByRole("alert"))
        .toHaveTextContent("Passwords do not match")
    })

    it("should show spinner when registering new user", async () => {
      jest.useFakeTimers();

      userRegister.mockImplementationOnce(
        () => new Promise(resolve => setTimeout(() => resolve()))
      );

      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))

      expect(
        screen.getByTestId("loader")
      ).toBeInTheDocument();
    })

    it("should not show spinner when register resolves", async () => {
      userRegister.mockResolvedValueOnce({
        status: 201
      });

      await act(async () => userEvent.type(emailInput, validEmailInput))
      await act(async () => userEvent.type(passwordInput, validPasswordInput))
      await act(async () => userEvent.type(confirmPasswordInput, validPasswordInput))

      await act(async () => userEvent.click(registerButton))

      expect(
        screen.queryAllByTestId("loader")
      ).toStrictEqual([])
    })
  })
})
