import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TreatmentVisualiser } from "../treatment-visualiser";
import { STAGE_SETS } from "@/lib/clinic";

describe("TreatmentVisualiser Component", () => {
  it("renders all procedure tabs and allows switching between procedures", () => {
    render(<TreatmentVisualiser />);

    // Verify all stage set tabs are rendered
    for (const set of STAGE_SETS) {
      expect(screen.getByRole("button", { name: set.label })).toBeInTheDocument();
    }

    // Default procedure is Root Canal (7 stages)
    expect(screen.getByText("Stage 1 of 7")).toBeInTheDocument();
    expect(screen.getAllByText(STAGE_SETS[0]!.stages[0]!.title).length).toBeGreaterThanOrEqual(1);

    // Switch to Braces (5 stages)
    fireEvent.click(screen.getByRole("button", { name: "Braces" }));
    expect(screen.getByText("Stage 1 of 5")).toBeInTheDocument();
    expect(screen.getAllByText(STAGE_SETS[1]!.stages[0]!.title).length).toBeGreaterThanOrEqual(1);

    // Switch to Clear Aligners (4 stages)
    fireEvent.click(screen.getByRole("button", { name: "Clear Aligners" }));
    expect(screen.getByText("Stage 1 of 4")).toBeInTheDocument();

    // Switch to Dental Implant (4 stages)
    fireEvent.click(screen.getByRole("button", { name: "Dental Implant" }));
    expect(screen.getByText("Stage 1 of 4")).toBeInTheDocument();
  });

  it("navigates through procedure stages using Next, Previous and direct selection", () => {
    render(<TreatmentVisualiser />);

    const prevBtn = screen.getByRole("button", { name: /previous stage/i });
    const nextBtn = screen.getByRole("button", { name: /next stage/i });

    // Stage 0: Previous is disabled
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();
    expect(screen.getByText("Stage 1 of 7")).toBeInTheDocument();

    // Step forward
    fireEvent.click(nextBtn);
    expect(screen.getByText("Stage 2 of 7")).toBeInTheDocument();
    expect(prevBtn).toBeEnabled();

    // Step forward multiple times to the final stage (Stage 7 of 7)
    for (let i = 2; i < 7; i++) {
      fireEvent.click(nextBtn);
    }
    expect(screen.getByText("Stage 7 of 7")).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    // Step backward
    fireEvent.click(prevBtn);
    expect(screen.getByText("Stage 6 of 7")).toBeInTheDocument();
    expect(nextBtn).toBeEnabled();

    // Direct stage selection from list
    const stage3Button = screen.getByRole("button", {
      name: new RegExp(STAGE_SETS[0]!.stages[2]!.title, "i"),
    });
    fireEvent.click(stage3Button);
    expect(screen.getByText("Stage 3 of 7")).toBeInTheDocument();
  });

  it("enforces rotation clamp bounds [-38, 38] during drag", () => {
    const { container } = render(<TreatmentVisualiser />);

    // Surface element has touchAction: none and perspective
    const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
    expect(surface).toBeTruthy();

    const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;
    expect(transformTarget).toBeTruthy();

    // Pointer down at x=100
    fireEvent.pointerDown(surface, { pointerId: 1, clientX: 100, clientY: 100 });

    // Drag right by +500px -> rotation would be 0 + 500*0.35 = 175deg -> clamped to 38deg
    fireEvent.pointerMove(surface, { pointerId: 1, clientX: 600, clientY: 100 });
    expect(transformTarget.style.transform).toContain("rotateY(38deg)");

    // Drag left by -500px -> rotation would be 0 - 500*0.35 = -175deg -> clamped to -38deg
    fireEvent.pointerMove(surface, { pointerId: 1, clientX: -400, clientY: 100 });
    expect(transformTarget.style.transform).toContain("rotateY(-38deg)");
  });

  it("enforces zoom clamp bounds [1.0, 2.2] during pinch gesture", () => {
    const { container } = render(<TreatmentVisualiser />);

    const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
    const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;

    // Start with 2 pointers at distance 100px
    fireEvent.pointerDown(surface, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerDown(surface, { pointerId: 2, clientX: 200, clientY: 100 });

    // Pinch zoom out (expand pointers to 500px, dist=400 -> calculated zoom 4.0 -> clamped to 2.2)
    fireEvent.pointerMove(surface, { pointerId: 2, clientX: 500, clientY: 100 });
    expect(transformTarget.style.transform).toContain("scale(2.2)");

    // Pinch zoom in (contract pointers to 10px, dist=10 -> calculated zoom 0.1 -> clamped to 1)
    fireEvent.pointerMove(surface, { pointerId: 2, clientX: 110, clientY: 100 });
    expect(transformTarget.style.transform).toContain("scale(1)");
  });

  it("guarantees gesture isolation so rotating does not trigger stage transitions", () => {
    const { container } = render(<TreatmentVisualiser />);

    const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
    expect(screen.getByText("Stage 1 of 7")).toBeInTheDocument();

    // Perform a large pointer drag and release
    fireEvent.pointerDown(surface, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(surface, { pointerId: 1, clientX: 350, clientY: 100 });
    fireEvent.pointerUp(surface, { pointerId: 1, clientX: 350, clientY: 100 });

    // Stage must still strictly be 1 of 7 (dragging to rotate does not change stages)
    expect(screen.getByText("Stage 1 of 7")).toBeInTheDocument();
  });

  it("resets rotation and zoom when Reset View button is clicked", () => {
    const { container } = render(<TreatmentVisualiser />);

    const surface = container.querySelector('div[style*="perspective"]') as HTMLElement;
    const transformTarget = surface.querySelector('div[style*="rotateY"]') as HTMLElement;

    // Rotate model
    fireEvent.pointerDown(surface, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(surface, { pointerId: 1, clientX: 160, clientY: 100 });
    expect(transformTarget.style.transform).not.toContain("rotateY(0deg)");

    // Click reset view
    const resetBtn = screen.getByRole("button", { name: /reset view/i });
    fireEvent.click(resetBtn);

    expect(transformTarget.style.transform).toContain("rotateY(0deg)");
    expect(transformTarget.style.transform).toContain("scale(1)");
  });

  it("renders medical illustration SVG models for each procedure", () => {
    render(<TreatmentVisualiser />);

    // Root canal SVG is displayed
    expect(screen.getByRole("img", { name: "Root canal stage 1" })).toBeInTheDocument();

    // Switch to braces
    fireEvent.click(screen.getByRole("button", { name: "Braces" }));
    expect(screen.getByRole("img", { name: "Braces stage 1" })).toBeInTheDocument();

    // Switch to clear aligners
    fireEvent.click(screen.getByRole("button", { name: "Clear Aligners" }));
    expect(screen.getByRole("img", { name: "Clear aligner stage 1" })).toBeInTheDocument();

    // Switch to dental implant
    fireEvent.click(screen.getByRole("button", { name: "Dental Implant" }));
    expect(screen.getByRole("img", { name: "Dental implant stage 1" })).toBeInTheDocument();
  });
});
