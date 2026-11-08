import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("application entry", () => {
  beforeEach(() => sessionStorage.clear());
  it("redirects unauthenticated users to login", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Acesse sua conta" })).toBeInTheDocument();
  });
});
