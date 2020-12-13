import React from "react";
import { act, render, screen } from "@testing-library/react"

import Login from "../../pages/login";

let loginPage

describe('Login page tests', () => {
  beforeEach(async () => {
    await act(async () => {
      loginPage = render(<Login />);
    });
  })

  it('should show email share message', async () => {
    loginPage.debug()
    expect(screen.getByText("We'll never share your email with anyone else.")).toBeInTheDocument();
  })
})  