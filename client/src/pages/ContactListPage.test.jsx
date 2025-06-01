import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("bootstrap/js/dist/toast", () => {
  class FakeToast {
    show() {}
    static getOrCreateInstance() {
      return new FakeToast();
    }
  }
  return { default: FakeToast };
});

import ContactListPage from "./ContactListPage";
import { ContactProvider } from "../context/ContactContext";
import { mockContacts } from "../utils/mockData";

const renderList = () => {
  localStorage.setItem("contacts", JSON.stringify(mockContacts));
  return render(
    <MemoryRouter>
      <ContactProvider>
        <ContactListPage />
      </ContactProvider>
    </MemoryRouter>
  );
};

describe("ContactListPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders all contacts from Local Storage", async () => {
    renderList();

    const table = screen.getByRole("table", { name: /contact list/i });

    for (const c of mockContacts) {
      expect(
        await within(table).findByText(c.firstName, { exact: true })
      ).toBeInTheDocument();
    }
  });

  it("sorts by first name when the column header is clicked", () => {
    renderList();

    const header = screen.getByRole("columnheader", { name: /first name/i });

    fireEvent.click(header);
    const rowsAsc = screen.getAllByTestId("contact-row");
    const namesAsc = rowsAsc.map((row) =>
      within(row).getByTestId("cell-firstName").textContent
    );
    expect(namesAsc).toEqual(
      [...mockContacts]
        .map((c) => c.firstName)
        .sort((a, b) => a.localeCompare(b))
    );

    fireEvent.click(header);
    const rowsDesc = screen.getAllByTestId("contact-row");
    const namesDesc = rowsDesc.map((row) =>
      within(row).getByTestId("cell-firstName").textContent
    );
    expect(namesDesc).toEqual(
      [...mockContacts]
        .map((c) => c.firstName)
        .sort((a, b) => b.localeCompare(a))
    );
  });

  it("deletes a contact when the delete button is confirmed", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true); 

    renderList();

    const rowsBefore = screen.getAllByTestId("contact-row");
    const firstRow = rowsBefore[0];
    const deleteBtn = within(firstRow).getByRole("button", { name: /delete/i });

    fireEvent.click(deleteBtn);

    await waitFor(() => {
      const rowsAfter = screen.getAllByTestId("contact-row");
      expect(rowsAfter).toHaveLength(rowsBefore.length - 1);
    });
  });
});
