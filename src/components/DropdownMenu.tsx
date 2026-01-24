import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
  type MenuItemProps,
} from "react-aria-components";
import "./DropdownMenu.css";

export interface DropdownMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
  className?: string;
}

export function DropdownMenu({ label, items, className }: DropdownMenuProps) {
  return (
    <MenuTrigger>
      <Button className={`dropdown-trigger ${className || ""}`}>
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="dropdown-arrow"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Popover className="dropdown-popover">
        <Menu className="dropdown-menu">
          {items.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              className="dropdown-menu-item"
            >
              <div className="menu-item-content">
                <span className="menu-item-label">{item.label}</span>
                {item.description && (
                  <span className="menu-item-description">
                    {item.description}
                  </span>
                )}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
