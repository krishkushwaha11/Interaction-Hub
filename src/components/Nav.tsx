
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Home, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <div className="hidden font-bold sm:inline-block">
              <span className="text-primary">Touchpoint</span> CRM
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/contacts"
              className="flex items-center gap-1 transition-colors hover:text-foreground/80"
            >
              <Users className="h-4 w-4" />
              <span>Contacts</span>
            </Link>
          </nav>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Add New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/contacts/new">New Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
