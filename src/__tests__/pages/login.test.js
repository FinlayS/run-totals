import React from "react";
import { act, render, screen } from "@testing-library/react"

import Login from "../../pages/Login";

describe('Login page test', () => {
  it('should show email share message', async () => {
    await act(async () => {
      render(<Login />);
    });

    expect(screen.getByText("We'll never share your email with anyone else.")).toBeInTheDocument();
  })
})