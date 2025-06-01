import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactFormPage from "../pages/ContactFormPage";
import { MemoryRouter } from "react-router-dom";
import { ContactProvider } from "../context/ContactContext";
import { testContacts } from "../utils/testData";

function renderForm() {
  return render(
    <MemoryRouter>
      <ContactProvider>
        <ContactFormPage />
      </ContactProvider>
    </MemoryRouter>
  );
}

test.each(testContacts)(
  "$valid contact form test: $firstName $lastName",
  async (contact) => {
    renderForm();

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: contact.firstName },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: contact.lastName },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: contact.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: contact.phoneNumber },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: contact.address },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: contact.city },
    });
    fireEvent.change(screen.getByLabelText(/State/i), {
      target: { value: contact.state },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: contact.country },
    });
    fireEvent.change(screen.getByLabelText(/Postal Code/i), {
      target: { value: contact.postalCode },
    });

    fireEvent.click(screen.getByRole("button", { name: /save contact/i }));

    if (contact.valid) {
      await waitFor(() =>
        expect(screen.queryByText(/must be at least/i)).not.toBeInTheDocument()
      );
    } else {
      const errorMessage = await screen.findByText(contact.expectedError);
      expect(errorMessage).toBeInTheDocument();
    }
  }
);
