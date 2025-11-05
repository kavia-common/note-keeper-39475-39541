import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Note Keeper header", () => {
  render(<App />);
  expect(screen.getByText(/Note Keeper/i)).toBeInTheDocument();
});
