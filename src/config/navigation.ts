export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Doctor के बारे में", href: "#about" },
  { label: "Appointment Book करें", href: "#booking" },
  { label: "संपर्क करें", href: "#contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
