import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Booking } from "../booking";
import { CLINIC, validateBookingSearch } from "@/lib/clinic";

describe("Booking Component", () => {
  it("keeps a service selected when arriving from its treatment page", () => {
    render(<Booking initialTreatment="Skin Consultation (Skin)" />);
    expect(screen.getByRole("button", { name: "Skin Consultation (Skin)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /continue/i })).toBeEnabled();
  });

  it("rejects unknown and non-string treatment query values", () => {
    expect(validateBookingSearch({ treatment: "Braces" })).toEqual({ treatment: "Braces" });
    expect(validateBookingSearch({ treatment: ["Braces"] })).toEqual({});
    expect(validateBookingSearch({ treatment: "Unknown treatment" })).toEqual({});
    render(<Booking initialTreatment="Unknown treatment" />);
    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  });
  it("renders initial step with treatment options and disabled navigation", () => {
    render(<Booking />);

    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
    expect(screen.getByText("Which treatment do you need?")).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /back/i });
    const continueButton = screen.getByRole("button", { name: /continue/i });

    expect(backButton).toBeDisabled();
    expect(continueButton).toBeDisabled();

    // Verify dental and skin treatments are rendered
    expect(screen.getByRole("button", { name: /teeth whitening/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /general dentistry/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skin consultation \(skin\)/i })).toBeInTheDocument();
  });

  it("prevents skipping steps when required selections are missing", () => {
    render(<Booking />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();

    // Select treatment -> Step 1 enabled
    fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton);

    // Step 2: Doctor -> Continue must be disabled initially
    expect(screen.getByText("Step 2 of 6")).toBeInTheDocument();
    expect(screen.getByText("Preferred doctor")).toBeInTheDocument();
    expect(continueButton).toBeDisabled();

    // Select doctor -> Continue enabled
    fireEvent.click(screen.getByRole("button", { name: /no preference — first available/i }));
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton);

    // Step 3: Date -> Continue must be disabled initially
    expect(screen.getByText("Step 3 of 6")).toBeInTheDocument();
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
    expect(continueButton).toBeDisabled();

    // Select first date -> Continue enabled
    const dateButtons = screen.getAllByRole("button").filter((btn) => {
      return btn.className.includes("w-[4.5rem]");
    });
    expect(dateButtons.length).toBe(12);
    fireEvent.click(dateButtons[0]!);
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton);

    // Step 4: Time -> Continue must be disabled initially
    expect(screen.getByText("Step 4 of 6")).toBeInTheDocument();
    expect(screen.getByText("Preferred time")).toBeInTheDocument();
    expect(continueButton).toBeDisabled();

    // Select time -> Continue enabled
    fireEvent.click(screen.getByRole("button", { name: "2:00 pm" }));
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton);

    // Step 5: Details -> Continue must be disabled initially
    expect(screen.getByText("Step 5 of 6")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Ahmed Raza")).toBeInTheDocument();
    expect(continueButton).toBeDisabled();
  });

  it("validates contact details and rejects non-digit/invalid phone numbers", () => {
    render(<Booking />);

    const continueButton = screen.getByRole("button", { name: /continue/i });

    // Navigate to Step 5 (Details)
    fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
    fireEvent.click(continueButton);
    fireEvent.click(screen.getByRole("button", { name: /no preference — first available/i }));
    fireEvent.click(continueButton);

    const dateButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.className.includes("w-[4.5rem]"));
    fireEvent.click(dateButtons[0]!);
    fireEvent.click(continueButton);

    fireEvent.click(screen.getByRole("button", { name: "2:00 pm" }));
    fireEvent.click(continueButton);

    expect(screen.getByText("Step 5 of 6")).toBeInTheDocument();
    const nameInput = screen.getByPlaceholderText("e.g. Ahmed Raza");
    const phoneInput = screen.getByPlaceholderText("03XX XXXXXXX");

    // Case 1: Empty inputs
    expect(continueButton).toBeDisabled();

    // Case 2: Short name (<2 characters) with valid phone
    fireEvent.change(nameInput, { target: { value: "A" } });
    fireEvent.change(phoneInput, { target: { value: "03120083540" } });
    expect(continueButton).toBeDisabled();

    // Case 3: Valid name with non-digit phone string
    fireEvent.change(nameInput, { target: { value: "Ahmed Raza" } });
    fireEvent.change(phoneInput, { target: { value: "not-a-phone-number" } });
    expect(continueButton).toBeDisabled();

    // Case 4: Valid name with alphanumeric phone
    fireEvent.change(phoneInput, { target: { value: "03120083540abc" } });
    expect(continueButton).toBeDisabled();

    // Case 5: Valid name with short phone (<10 digits)
    fireEvent.change(phoneInput, { target: { value: "031200" } });
    expect(continueButton).toBeDisabled();

    // Case 6: Valid name with too long phone (>13 digits)
    fireEvent.change(phoneInput, { target: { value: "0312008354012345" } });
    expect(continueButton).toBeDisabled();

    // Case 7: Valid phone with standard 11 digits
    fireEvent.change(phoneInput, { target: { value: "03120083540" } });
    expect(continueButton).toBeEnabled();

    // Case 8: Valid phone with country code +92
    fireEvent.change(phoneInput, { target: { value: "+923120083540" } });
    expect(continueButton).toBeEnabled();

    // Case 9: Valid phone with spaces and dashes
    fireEvent.change(phoneInput, { target: { value: "0312-008 3540" } });
    expect(continueButton).toBeEnabled();
  });

  it("navigates back and retains previous selections", () => {
    render(<Booking />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    const backButton = screen.getByRole("button", { name: /back/i });

    // Step 1: Select treatment
    fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
    fireEvent.click(continueButton);

    // Step 2: Select doctor
    expect(screen.getByText("Step 2 of 6")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /dental surgeon/i }));

    // Click back to return to Step 1
    fireEvent.click(backButton);
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
    const whiteningBtn = screen.getByRole("button", { name: /teeth whitening/i });
    expect(whiteningBtn).toHaveAttribute("aria-pressed", "true");

    // Click continue to return to Step 2
    fireEvent.click(continueButton);
    expect(screen.getByText("Step 2 of 6")).toBeInTheDocument();
    const doctorBtn = screen.getByRole("button", { name: /dental surgeon/i });
    expect(doctorBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("completes full 6-step flow and formats WhatsApp link with clinic details", () => {
    render(<Booking />);

    const continueButton = screen.getByRole("button", { name: /continue/i });

    // Step 1: Treatment
    fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
    fireEvent.click(continueButton);

    // Step 2: Doctor
    fireEvent.click(screen.getByRole("button", { name: /dental surgeon/i }));
    fireEvent.click(continueButton);

    // Step 3: Date
    const dateButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.className.includes("w-[4.5rem]"));
    fireEvent.click(dateButtons[0]!);
    fireEvent.click(continueButton);

    // Step 4: Time
    fireEvent.click(screen.getByRole("button", { name: "2:00 pm" }));
    fireEvent.click(continueButton);

    // Step 5: Details & Notes
    fireEvent.change(screen.getByPlaceholderText("e.g. Ahmed Raza"), {
      target: { value: "Ahmed Raza" },
    });
    fireEvent.change(screen.getByPlaceholderText("03XX XXXXXXX"), {
      target: { value: "03120083540" },
    });
    fireEvent.change(screen.getByPlaceholderText("Pain, previous treatment, medication…"), {
      target: { value: "Experiencing mild sensitivity" },
    });
    fireEvent.click(continueButton);

    // Step 6: Confirmation
    expect(screen.getByText("Step 6 of 6")).toBeInTheDocument();
    expect(screen.getByText("Review your appointment request")).toBeInTheDocument();
    expect(screen.getByText("Teeth Whitening")).toBeInTheDocument();
    expect(screen.getByText("Dental Surgeon")).toBeInTheDocument();
    expect(screen.getByText("2:00 pm")).toBeInTheDocument();
    expect(screen.getByText("Ahmed Raza")).toBeInTheDocument();
    expect(screen.getByText("03120083540")).toBeInTheDocument();

    // Verify WhatsApp Anchor
    const waLink = screen.getByRole("link", { name: /open request in whatsapp/i });
    expect(waLink).toBeInTheDocument();

    const expectedPhoneRaw = CLINIC.phoneHref.replace(/\D/g, "");
    expect(waLink.getAttribute("href")).toContain(`https://wa.me/${expectedPhoneRaw}`);

    const url = new URL(waLink.getAttribute("href")!);
    const message = url.searchParams.get("text");
    expect(message).toBeTruthy();
    expect(message).toContain(
      "Assalam o Alaikum, I would like to book an appointment at City Smiles.",
    );
    expect(message).toContain("Treatment: Teeth Whitening");
    expect(message).toContain("Doctor: Dental Surgeon");
    expect(message).toContain("Time: 2:00 pm");
    expect(message).toContain("Name: Ahmed Raza");
    expect(message).toContain("Phone: 03120083540");
    expect(message).toContain("Notes: Experiencing mild sensitivity");

    // Verify Direct Call Link
    const callLink = screen.getByRole("link", {
      name: new RegExp(`call ${CLINIC.phoneDisplay}`, "i"),
    });
    expect(callLink).toHaveAttribute("href", CLINIC.phoneHref);
  });

  it("generates calendar dates avoiding UTC timezone rollback", () => {
    render(<Booking />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
    fireEvent.click(continueButton);
    fireEvent.click(screen.getByRole("button", { name: /no preference — first available/i }));
    fireEvent.click(continueButton);

    const dateButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.className.includes("w-[4.5rem]"));
    expect(dateButtons.length).toBe(12);

    // Calculate expected tomorrow date using local time
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const expectedDay = tomorrow.toLocaleDateString("en-PK", { weekday: "short" });
    const expectedDate = String(tomorrow.getDate());

    expect(dateButtons[0]).toHaveTextContent(expectedDay);
    expect(dateButtons[0]).toHaveTextContent(expectedDate);
  });
});
