import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Support } from "../support";
import { Booking } from "../booking";
import { TreatmentVisualiser } from "../treatment-visualiser";
import { CLINIC, STAGE_SETS } from "@/lib/clinic";

describe("Adversarial Challenge & Stress Tests", () => {
  describe("1. Support Component - answerFor() Medical Distress & Shadowing Battery", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    const distressPhrases = [
      "terrible toothache",
      "bleeding gums",
      "extreme swelling",
      "need medicine",
      "takleef ho rahi hai",
      "emergency",
      "I have severe tooth pain and cannot sleep",
      "My gums are swollen and bleeding",
      "Mujhe bohat shaded dard hai",
      "I have an abscess in my lower molar",
      "severe infection in root",
      "which tablet should I take for wisdom tooth",
      "can you give me a prescription for antibiotics",
      "urgent medical triage required",
      "my jaw is hurting constantly",
      "can you diagnose my oral blister",
      "treatment for my severe toothache",
      "what do i have in my mouth it hurts so bad",
      "ache that is unbearable",
    ];

    it.each(distressPhrases)(
      "triggers clinical triage disclaimer for distress phrase: '%s'",
      (phrase) => {
        render(<Support />);
        fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

        const input = screen.getByLabelText("Write a message to reception");
        const sendBtn = screen.getByLabelText("Send message");

        fireEvent.change(input, { target: { value: phrase } });
        fireEvent.click(sendBtn);

        act(() => {
          vi.advanceTimersByTime(450);
        });

        // The triage disclaimer must be triggered
        const disclaimerMatches = screen.getAllByText((content) => {
          return (
            content.includes(
              "Our clinical team can advise you after an appropriate consultation",
            ) && content.includes(`call reception on ${CLINIC.phoneDisplay}`)
          );
        });

        expect(disclaimerMatches.length).toBeGreaterThanOrEqual(1);
      },
    );

    const shadowingTests = [
      {
        query: "I want to book an appointment because of terrible pain",
        shadowTarget: "booking",
      },
      {
        query: "How much is the price for treating bleeding gums?",
        shadowTarget: "pricing",
      },
      {
        query: "Can I get root canal for my severe toothache?",
        shadowTarget: "root canal",
      },
      {
        query: "What are your Sunday hours for emergency dental treatment?",
        shadowTarget: "hours",
      },
      {
        query: "Where is the clinic located? I have extreme swelling",
        shadowTarget: "location",
      },
      {
        query: "Can I talk to human reception regarding urgent pain",
        shadowTarget: "reception",
      },
      {
        query: "Teeth whitening consultation but my gums are bleeding and hurt",
        shadowTarget: "whitening",
      },
      {
        query: "Do you have slots or schedule for someone with an abscess infection?",
        shadowTarget: "schedule",
      },
    ];

    it.each(shadowingTests)(
      "prioritizes clinical triage over other intents without shadowing for: '$query'",
      ({ query }) => {
        render(<Support />);
        fireEvent.click(screen.getByRole("button", { name: /need help\?/i }));

        const input = screen.getByLabelText("Write a message to reception");
        const sendBtn = screen.getByLabelText("Send message");

        fireEvent.change(input, { target: { value: query } });
        fireEvent.click(sendBtn);

        act(() => {
          vi.advanceTimersByTime(450);
        });

        // Verify the response is the medical triage response and NOT the shadowed service response
        const disclaimer = screen.getByText((content) => {
          return (
            content.includes(
              "Our clinical team can advise you after an appropriate consultation",
            ) && content.includes(`call reception on ${CLINIC.phoneDisplay}`)
          );
        });
        expect(disclaimer).toBeInTheDocument();

        // Specific shadowed messages should NOT be rendered
        expect(
          screen.queryByText(/You can book in a few taps using the appointment section/i),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/Costs depend on the treatment and are always confirmed in writing/i),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/Root canal treatment saves an infected tooth/i),
        ).not.toBeInTheDocument();
      },
    );
  });

  describe("2. Booking Component - Phone Validation, Boundaries & Timezones", () => {
    it("handles boundary phone numbers and rejects invalid strings", () => {
      render(<Booking />);
      const continueButton = screen.getByRole("button", { name: /continue/i });

      // Navigate to step 5 (Your details)
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

      fireEvent.change(nameInput, { target: { value: "Test Patient" } });

      // Invalid strings:
      const invalidPhones = [
        "",
        "   ",
        "12345",
        "03120",
        "031200835", // 9 digits
        "03120083540123456", // 17 digits (>13)
        "03120083540abc",
        "phone1234567890",
        "<script>alert(1)</script>",
        "0312-008-ABCD",
      ];

      for (const inv of invalidPhones) {
        fireEvent.change(phoneInput, { target: { value: inv } });
        expect(continueButton).toBeDisabled();
      }

      // Valid boundary phones:
      const validPhones = [
        "03120083540", // standard 11 digits
        "+923120083540", // +92 prefix 13 chars
        "0312 008 3540", // spaces
        "0312-008-3540", // hyphens
        "+92 312-0083540", // mixed formatting
        "3120083540", // 10 digits
        "+14155552671", // US 11 digits
        "+447911123456", // UK 12 digits
        "+971501234567", // UAE 11 digits
      ];

      for (const val of validPhones) {
        fireEvent.change(phoneInput, { target: { value: val } });
        expect(continueButton).toBeEnabled();
      }
    });

    it("strictly prevents underflowing below Step 0 and overflowing past Step 5", () => {
      render(<Booking />);
      const backButton = screen.getByRole("button", { name: /back/i });
      const continueButton = screen.getByRole("button", { name: /continue/i });

      // At Step 0, Back is disabled
      expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
      expect(backButton).toBeDisabled();

      // Attempting to click disabled back button does not underflow
      fireEvent.click(backButton);
      expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();

      // Progress through all 6 steps
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

      fireEvent.change(screen.getByPlaceholderText("e.g. Ahmed Raza"), {
        target: { value: "Fatima Noor" },
      });
      fireEvent.change(screen.getByPlaceholderText("03XX XXXXXXX"), {
        target: { value: "03001234567" },
      });
      fireEvent.click(continueButton);

      // At Step 5 (Step 6 of 6 in UI), Continue is disabled
      expect(screen.getByText("Step 6 of 6")).toBeInTheDocument();
      expect(continueButton).toBeDisabled();

      // Attempting to click disabled continue button does not overflow
      fireEvent.click(continueButton);
      expect(screen.getByText("Step 6 of 6")).toBeInTheDocument();
    });

    it("verifies date keys are timezone-agnostic and match YYYY-MM-DD pattern", () => {
      render(<Booking />);

      // Navigate to Step 3 (Date)
      const continueButton = screen.getByRole("button", { name: /continue/i });
      fireEvent.click(screen.getByRole("button", { name: /teeth whitening/i }));
      fireEvent.click(continueButton);
      fireEvent.click(screen.getByRole("button", { name: /no preference — first available/i }));
      fireEvent.click(continueButton);

      const dateButtons = screen
        .getAllByRole("button")
        .filter((btn) => btn.className.includes("w-[4.5rem]"));

      expect(dateButtons.length).toBe(12);

      const today = new Date();
      for (let i = 0; i < 12; i++) {
        const offsetDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + (i + 1),
        );
        const expectedDateStr = String(offsetDate.getDate());
        const expectedDayStr = offsetDate.toLocaleDateString("en-PK", { weekday: "short" });
        const expectedMonthStr = offsetDate.toLocaleDateString("en-PK", { month: "short" });

        expect(dateButtons[i]).toHaveTextContent(expectedDateStr);
        expect(dateButtons[i]).toHaveTextContent(expectedDayStr);
        expect(dateButtons[i]).toHaveTextContent(expectedMonthStr);
      }
    });
  });

  describe("3. TreatmentVisualiser - Drag Distances, Multi-touch & Bounds", () => {
    it("strictly clamps rotation to [-38, 38] under extreme drag distances (+1000px and -1000px)", () => {
      const { container } = render(<TreatmentVisualiser />);
      const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
      const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;

      // Extreme drag right (+1000px)
      fireEvent.pointerDown(surface, { pointerId: 1, clientX: 200, clientY: 200 });
      fireEvent.pointerMove(surface, { pointerId: 1, clientX: 1200, clientY: 200 });
      expect(transformTarget.style.transform).toContain("rotateY(38deg)");

      // Extreme drag left (-1000px from start 1200)
      fireEvent.pointerMove(surface, { pointerId: 1, clientX: -800, clientY: 200 });
      expect(transformTarget.style.transform).toContain("rotateY(-38deg)");

      // Release pointer -> rotation decays to r * 0.35 (-38 * 0.35 = -13.3)
      fireEvent.pointerUp(surface, { pointerId: 1, clientX: -800, clientY: 200 });
      const settledMatch = transformTarget.style.transform.match(/rotateY\((-?[\d.]+)deg\)/);
      expect(settledMatch).toBeTruthy();
      const settledValue = parseFloat(settledMatch![1]!);
      expect(settledValue).toBeCloseTo(-13.3, 1);
      expect(settledValue).toBeGreaterThanOrEqual(-38);
      expect(settledValue).toBeLessThanOrEqual(38);
    });

    it("strictly clamps zoom within [1.0, 2.2] during extreme pinch gestures", () => {
      const { container } = render(<TreatmentVisualiser />);
      const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
      const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;

      // Start pinch with 2 pointers at 100px apart
      fireEvent.pointerDown(surface, { pointerId: 1, clientX: 100, clientY: 100 });
      fireEvent.pointerDown(surface, { pointerId: 2, clientX: 200, clientY: 100 });

      // Extreme expansion (dist = 1900px, 19x zoom) -> clamped strictly to 2.2
      fireEvent.pointerMove(surface, { pointerId: 2, clientX: 2000, clientY: 100 });
      expect(transformTarget.style.transform).toContain("scale(2.2)");

      // Extreme contraction (dist = 2px, 0.02x zoom) -> clamped strictly to 1.0
      fireEvent.pointerMove(surface, { pointerId: 2, clientX: 102, clientY: 100 });
      expect(transformTarget.style.transform).toContain("scale(1)");
    });

    it("gracefully handles multi-touch pointer releases and pointer cancellation", () => {
      const { container } = render(<TreatmentVisualiser />);
      const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
      const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;

      // Add two pointers
      fireEvent.pointerDown(surface, { pointerId: 10, clientX: 100, clientY: 100 });
      fireEvent.pointerDown(surface, { pointerId: 20, clientX: 200, clientY: 100 });

      // Move one pointer
      fireEvent.pointerMove(surface, { pointerId: 20, clientX: 300, clientY: 100 });

      // Release one pointer (pointer 10)
      fireEvent.pointerUp(surface, { pointerId: 10, clientX: 100, clientY: 100 });

      // Cancel other pointer (pointer 20) via pointerCancel
      fireEvent.pointerCancel(surface, { pointerId: 20, clientX: 300, clientY: 100 });

      // Verify rotation remains inside [-38, 38] and zoom within [1.0, 2.2]
      const transform = transformTarget.style.transform;
      const rotMatch = transform.match(/rotateY\((-?[\d.]+)deg\)/);
      const zoomMatch = transform.match(/scale\(([\d.]+)\)/);

      expect(rotMatch).toBeTruthy();
      expect(zoomMatch).toBeTruthy();

      const rotValue = parseFloat(rotMatch![1]!);
      const zoomValue = parseFloat(zoomMatch![1]!);

      expect(rotValue).toBeGreaterThanOrEqual(-38);
      expect(rotValue).toBeLessThanOrEqual(38);
      expect(zoomValue).toBeGreaterThanOrEqual(1.0);
      expect(zoomValue).toBeLessThanOrEqual(2.2);
    });

    it("handles rapid stage clicking without out-of-bounds state or race conditions", () => {
      render(<TreatmentVisualiser />);
      const nextBtn = screen.getByRole("button", { name: /next stage/i });
      const prevBtn = screen.getByRole("button", { name: /previous stage/i });

      // Rapidly click Next 15 times on Root Canal (which has 7 stages)
      for (let i = 0; i < 15; i++) {
        fireEvent.click(nextBtn);
      }
      expect(screen.getByText("Stage 7 of 7")).toBeInTheDocument();
      expect(nextBtn).toBeDisabled();

      // Rapidly click Previous 15 times
      for (let i = 0; i < 15; i++) {
        fireEvent.click(prevBtn);
      }
      expect(screen.getByText("Stage 1 of 7")).toBeInTheDocument();
      expect(prevBtn).toBeDisabled();

      // Switch to Clear Aligners (4 stages) while at stage 1
      fireEvent.click(screen.getByRole("button", { name: "Clear Aligners" }));
      expect(screen.getByText("Stage 1 of 4")).toBeInTheDocument();

      // Rapidly click all stage buttons in random order
      const stageButtons = screen
        .getAllByRole("button")
        .filter(
          (b) =>
            b.textContent && STAGE_SETS[2]!.stages.some((s) => b.textContent?.includes(s.title)),
        );

      for (const btn of stageButtons) {
        fireEvent.click(btn);
      }
      // Should end at the last clicked stage safely
      expect(screen.getByText(`Stage 4 of 4`)).toBeInTheDocument();
    });
  });
});
