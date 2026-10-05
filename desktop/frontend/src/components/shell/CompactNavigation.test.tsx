// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CompactNavigation } from "./CompactNavigation";

vi.mock("../../i18n/i18n", () => ({ useI18n: () => ({ locale: "en", t: (key: string) => key }) }));
beforeEach(() => vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("keeps all network navigation and exposes no assistant entry", () => {
  render(<CompactNavigation page="settings" onPageChange={vi.fn()} />);
  expect(screen.getByRole("button", { name: "nav_home" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "nav_settings" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "nav_routing" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Toolbox" })).toBeTruthy();
  expect(screen.queryByRole("button", { name: "AI assistant" })).toBeNull();
});