import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Logo } from "../logo";
import { Header } from "../header";
import { Footer } from "../footer";
import { Hero } from "../hero";
import { CLINIC } from "@/lib/clinic";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    activeProps: _activeProps,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
    activeProps?: Record<string, unknown>;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useRouterState: () => ({
    location: { pathname: "/" },
  }),
}));

describe("Branding & Layout Components", () => {
  describe("Logo Component", () => {
    it("renders valid image source and alt text without undefined or broken path", () => {
      render(<Logo />);

      const img = screen.getByRole("img", {
        name: `${CLINIC.name} ${CLINIC.tagline} logo`,
      }) as HTMLImageElement;

      expect(img).toBeInTheDocument();
      expect(img.src).toBeTruthy();
      expect(img.getAttribute("src")).not.toBe("undefined");
      expect(img.getAttribute("src")).not.toBe("");
      expect(img).toHaveAttribute("width", "264");
      expect(img).toHaveAttribute("height", "240");
      expect(img).toHaveAttribute("decoding", "async");
      expect(img).toHaveClass("h-11");
    });

    it("accepts custom className for sizing", () => {
      render(<Logo className="h-16 w-32" />);

      const img = screen.getByRole("img", {
        name: `${CLINIC.name} ${CLINIC.tagline} logo`,
      });
      expect(img).toHaveClass("h-16");
      expect(img).toHaveClass("w-32");
    });
  });

  describe("Header Component", () => {
    it("renders branding, logo, navigation links, and action buttons", () => {
      render(<Header />);

      // Home link with logo
      const homeLink = screen.getByRole("link", { name: `${CLINIC.name} home` });
      expect(homeLink).toHaveAttribute("href", "/");

      // Brand text
      expect(screen.getByText(CLINIC.name)).toBeInTheDocument();
      expect(screen.getByText(CLINIC.tagline)).toBeInTheDocument();

      // Top bar info
      expect(screen.getByText(new RegExp(`${CLINIC.city}, Pakistan`, "i"))).toBeInTheDocument();

      // Multi-page navigation links
      const dentalLink = screen.getByRole("link", { name: /dental care/i });
      expect(dentalLink).toHaveAttribute("href", "/dental");

      const skinLink = screen.getByRole("link", { name: /skin clinic/i });
      expect(skinLink).toHaveAttribute("href", "/skin");

      const doctorsLink = screen.getByRole("link", { name: /doctors & stories/i });
      expect(doctorsLink).toHaveAttribute("href", "/doctors");

      const contactLink = screen.getByRole("link", { name: /contact & faqs/i });
      expect(contactLink).toHaveAttribute("href", "/contact");

      // Book Consultation button
      const bookBtn = screen.getByRole("link", { name: /book a consultation/i });
      expect(bookBtn).toHaveAttribute("href", "/book");
    });

    it("toggles mobile navigation drawer when menu button is clicked", () => {
      render(<Header />);

      const openButton = screen.getByRole("button", { name: /open menu/i });
      expect(openButton).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /close menu/i })).not.toBeInTheDocument();

      // Open mobile menu
      fireEvent.click(openButton);
      const closeButton = screen.getByRole("button", { name: /close menu/i });
      expect(closeButton).toBeInTheDocument();

      // Close mobile menu
      fireEvent.click(closeButton);
      expect(screen.queryByRole("button", { name: /close menu/i })).not.toBeInTheDocument();
    });
  });

  describe("Footer Component", () => {
    it("renders logo, clinic address, promise, and direct contact channels", () => {
      render(<Footer />);

      // Logo in footer
      const logo = screen.getByRole("img", {
        name: `${CLINIC.name} ${CLINIC.tagline} logo`,
      });
      expect(logo).toBeInTheDocument();

      // Promise text
      expect(screen.getByText(new RegExp(CLINIC.promise, "i"))).toBeInTheDocument();

      // Contact links
      const phoneLink = screen.getByRole("link", { name: CLINIC.phoneDisplay });
      expect(phoneLink).toHaveAttribute("href", CLINIC.phoneHref);

      const whatsappLink = screen.getByRole("link", { name: /whatsapp/i });
      expect(whatsappLink).toHaveAttribute("href", CLINIC.whatsappHref);

      // Multi-page footer links
      const dentalLink = screen.getByRole("link", { name: "Dental Care Services" });
      expect(dentalLink).toHaveAttribute("href", "/dental");

      const skinLink = screen.getByRole("link", { name: "Skin Clinic & Aesthetics" });
      expect(skinLink).toHaveAttribute("href", "/skin");

      // Copyright with year and city
      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(
          new RegExp(`© ${currentYear} ${CLINIC.name} ${CLINIC.tagline}, ${CLINIC.city}\\.`, "i"),
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("QYVORA")).toBeInTheDocument();
    });
  });

  describe("Hero Component", () => {
    it("renders Dental Aesthetics inspired layout, typography, CTAs and quick information cards", () => {
      render(<Hero />);

      // Hero Heading & Subheading
      expect(
        screen.getByRole("heading", {
          name: /Experience The Best Dental & Skin Care\./i,
          level: 1,
        }),
      ).toBeInTheDocument();

      expect(screen.getByText(/Let Us Make Your Smile Look Perfect/i)).toBeInTheDocument();

      // Pill Consultation CTA
      const consultBtn = screen.getByRole("link", { name: /get a consultation/i });
      expect(consultBtn).toBeInTheDocument();
      expect(consultBtn).toHaveAttribute("href", "/book");

      // Desktop overlapping card headers
      expect(
        screen.getByRole("heading", { name: `${CLINIC.name} Sialkot`, level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /emergency & walk-ins/i, level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /aesthetic skin clinic/i, level: 2 }),
      ).toBeInTheDocument();

      // Mobile card tabs switcher
      const emergencyTab = screen.getByRole("button", { name: /emergency care/i });
      fireEvent.click(emergencyTab);
      expect(screen.getByText(/Priority triage for acute toothache/i)).toBeInTheDocument();

      const skinTab = screen.getByRole("button", { name: /skin clinic/i });
      fireEvent.click(skinTab);
      expect(screen.getByText(/Clinical Hydrafacial, acne therapy/i)).toBeInTheDocument();
    });
  });
});
