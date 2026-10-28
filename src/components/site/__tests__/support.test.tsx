import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Support } from "../support";
import { CLINIC } from "@/lib/clinic";

describe("Support Component (Reception Assistant)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("toggles the support chat window open and closed", () => {
    render(<Support />);

    const toggleButton = screen.getByRole("button", { name: /need help\?/i });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(`${CLINIC.name} Support`)).not.toBeInTheDocument();

    // Open chat drawer
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveTextContent("Close");
    expect(screen.getByText(`${CLINIC.name} Support`)).toBeInTheDocument();
    expect(screen.getByText("Hi! How can we help you today?")).toBeInTheDocument();

    // Close chat drawer
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveTextContent("Need Help?");
    expect(screen.queryByText(`${CLINIC.name} Support`)).not.toBeInTheDocument();
  });

  it("triggers medical pain and emergency triage disclaimer for clinical distress keywords", () => {
    render(<Support />);

    // Open drawer
    fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

    const input = screen.getByLabelText("Write a message to reception");
    const sendBtn = screen.getByLabelText("Send message");

    const triageTestQueries = [
      "I have severe tooth pain and cannot sleep",
      "I have a terrible toothache",
      "My gums are swollen and bleeding gums",
      "Mujhe bohat shaded dard hai",
      "This is an emergency situation",
    ];

    for (const query of triageTestQueries) {
      fireEvent.change(input, { target: { value: query } });
      fireEvent.click(sendBtn);

      act(() => {
        vi.advanceTimersByTime(450);
      });

      // Verify safety disclaimer was dispatched and contains clinic phone
      expect(
        screen.getAllByText((content) => {
          return (
            content.includes(
              "Our clinical team can advise you after an appropriate consultation",
            ) && content.includes(`call reception on ${CLINIC.phoneDisplay}`)
          );
        }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("classifies standard service intents accurately", () => {
    render(<Support />);

    fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

    const input = screen.getByLabelText("Write a message to reception");
    const sendBtn = screen.getByLabelText("Send message");

    // 1. Teeth whitening intent
    fireEvent.change(input, { target: { value: "Tell me about teeth whitening" } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(
      screen.getByText(/Our dental services include general dentistry, cleaning, whitening/i),
    ).toBeInTheDocument();

    // 2. Implants intent
    fireEvent.change(input, { target: { value: "How do dental implants work?" } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(
      screen.getAllByText(/Our dental services include general dentistry, cleaning, whitening/i)
        .length,
    ).toBeGreaterThanOrEqual(1);

    // 3. Clinic hours intent
    fireEvent.change(input, { target: { value: "What are your opening hours on Sunday?" } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(
      screen.getByText(new RegExp(`${CLINIC.hours[0].days}: ${CLINIC.hours[0].time}`, "i")),
    ).toBeInTheDocument();
  });

  it("handles booking appointment intent", () => {
    render(<Support />);

    fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

    const input = screen.getByLabelText("Write a message to reception");
    const sendBtn = screen.getByLabelText("Send message");

    fireEvent.change(input, { target: { value: "I want to book appointment for tomorrow" } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(
      screen.getByText(
        new RegExp(
          `You can book in a few taps using the appointment section.*WhatsApp ${CLINIC.whatsappDisplay.replace("+", "\\+")}`,
          "i",
        ),
      ),
    ).toBeInTheDocument();
  });

  it("responds with fallback message for unrecognized input", () => {
    render(<Support />);

    fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

    const input = screen.getByLabelText("Write a message to reception");
    const sendBtn = screen.getByLabelText("Send message");

    fireEvent.change(input, { target: { value: "Do you sell quantum computers and cars?" } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(
      screen.getByText((content) => {
        return (
          content.includes(
            "I can help with appointments, treatments, clinic hours, location and general preparation.",
          ) &&
          content.includes(CLINIC.phoneDisplay) &&
          content.includes(CLINIC.whatsappDisplay)
        );
      }),
    ).toBeInTheDocument();
  });

  it("sends quick prompt when clicked and ignores empty whitespace input", () => {
    render(<Support />);

    fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

    const input = screen.getByLabelText("Write a message to reception");
    const sendBtn = screen.getByLabelText("Send message");

    // Whitespace submission should do nothing
    fireEvent.change(input, { target: { value: "     " } });
    fireEvent.click(sendBtn);
    act(() => {
      vi.advanceTimersByTime(450);
    });
    // Still only initial message
    expect(screen.queryByText("     ")).not.toBeInTheDocument();

    // Click quick prompt "Root Canal"
    const quickBtn = screen.getByRole("button", { name: "Root Canal" });
    fireEvent.click(quickBtn);

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/Root canal treatment saves an infected tooth/i)).toBeInTheDocument();
  });
});
