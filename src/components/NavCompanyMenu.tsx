import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

const companyMenuItems: DropdownMenuItem[] = [
  {
    label: "Demos",
    href: "/demos",
    description: "Interactive examples",
  },
  {
    label: "Services",
    href: "/services",
    description: "Professional support and consulting",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "Tools and libraries we use",
  },
  {
    label: "Mission",
    href: "/mission",
    description: "Why we're building Bedrock.engineer",
  },
];

export function NavCompanyMenu() {
  return <DropdownMenu label="Company" items={companyMenuItems} />;
}
