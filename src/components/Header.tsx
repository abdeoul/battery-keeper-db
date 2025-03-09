
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Battery, Database, Home, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { to: '/database', label: 'Database', icon: <Database className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border animate-slide-down">
      <div className="max-container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary">
          <Battery className="h-7 w-7" />
          <span className="font-medium text-xl">BatteryDB</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-1 text-sm font-medium py-2 border-b-2 border-transparent transition-colors",
                location.pathname === link.to ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/add" className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            <span>Add Battery</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
