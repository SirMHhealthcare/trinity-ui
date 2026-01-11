export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Treatments", href: "#treatments" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Treatments", href: "#treatments" },
  { label: "About Doctor", href: "#about" },
  { label: "Book Appointment", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
