import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLoginButton from "./AdminLoginButton";
import { useAdmin } from "@/contexts/AdminContext";
import { useUnreadCount } from "@/hooks/use-messages";

const navLinks = [
  { label: "Projets", href: "/projets" },
  { label: "Competences", href: "/competences" },
  { label: "Blog", href: "/blog" },
  { label: "CV", href: "/cv" },
  { label: "A propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const { data: unreadData } = useUnreadCount(isAdmin);
  const unreadCount = unreadData?.count || 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-header ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
          Alfred<span className="text-accent">.</span>MysteriowebData
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                location.pathname.startsWith(link.href)
                  ? "text-foreground bg-foreground/5"
                  : "text-[#6B6B6B] hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-full text-[#6B6B6B] hover:text-foreground hover:bg-foreground/5 transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            )}
            <AdminLoginButton />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location.pathname.startsWith(link.href)
                      ? "text-foreground bg-foreground/5"
                      : "text-[#6B6B6B] hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                {isAdmin && (
                  <Link
                    to="/notifications"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#6B6B6B] hover:text-foreground transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    Messages
                    {unreadCount > 0 && (
                      <span className="ml-auto w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>
                )}
                <AdminLoginButton />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
