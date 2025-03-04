
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" className="text-xl font-bold">
            Alex<span className="text-primary">Chen</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <NavLink to="/" className="nav-link text-sm">
            Home
          </NavLink>
          <NavLink to="/skills" className="nav-link text-sm">
            Skills
          </NavLink>
          <NavLink to="/projects" className="nav-link text-sm">
            Projects
          </NavLink>
          <NavLink to="/contact" className="nav-link text-sm">
            Contact
          </NavLink>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/skills"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
