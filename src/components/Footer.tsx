
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-3 bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Touchpoint CRM
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
