import React from 'react';
import {act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../pages/login';

const userLogin = jest.fn();

let emailInput, loginPage, passwordInput, submitButton;

const elementContainers = async () => {
  emailInput = screen.getByTestId('email-input');
  passwordInput = screen.getByTestId('password-input');
  submitButton = screen.getByRole("button", { name: "Login" });
};

describe('Login page tests', () => {
  beforeEach(async () => {
    await act(async () => {
      loginPage = render(<Login />);
      await elementContainers()
    });
  })

  describe('Page Render', () => {
    it('should show email share message', async () => {

      expect(screen.getByText("We'll never share your email with anyone else."))
        .toBeInTheDocument();
    })

    it('should render elements', async () => {

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    })

    it('continue button is not enabled', async () => {

      expect(submitButton).toBeDisabled();
    })
  })

  describe('Client side validation', () => {
    it('should show empty email warning', async () => {

      await act(async () => fireEvent.blur(emailInput))
      expect(
        screen.getByText("Please enter an email address")
      ).toBeInTheDocument();

      expect(submitButton).toBeDisabled();
    })

    it('should show invalid email warning', async () => {

      userEvent.type(emailInput, 'invalid@email')
      await act(async () => fireEvent.blur(emailInput))

      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    })

    it('should show empty password warning', async () => {

      await act(async () => fireEvent.blur(passwordInput))
      expect(
        screen.getByText("Please enter a valid password")
      ).toBeInTheDocument();

      expect(submitButton).toBeDisabled();
    })

    it('should show invalid password warning', async () => {

      userEvent.type(passwordInput, 'invalid@email')
      await act(async () => fireEvent.blur(passwordInput))

      expect(
        screen.getByText("Must Contain 8 characters, one uppercase and one number")
      ).toBeInTheDocument();

      expect(submitButton).toBeDisabled();
    })

    it('can continue with valid input', async () => {

      userEvent.type(emailInput, 'valid@email.com')
      userEvent.type(passwordInput, 'ValidPassw0rd')
      await act(async () => fireEvent.blur(passwordInput))

      expect(submitButton).toBeEnabled();
    })
  })

  describe('Client side validation', () => {

  })

})  