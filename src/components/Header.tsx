import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  libraryCount: number;
  onNavigate: (section: 'catalog' | 'library' | 'profile') => void;
  activeSection: string;
}

export default function Header({ searchQuery, onSearchChange, libraryCount, onNavigate, activeSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-gradient cursor-pointer" onClick={() => onNavigate('catalog')}>
              GameVault
            </h1>
            
            <nav className="hidden md:flex items-center gap-1">
              <Button 
                variant={activeSection === 'catalog' ? 'default' : 'ghost'} 
                className="gap-2"
                onClick={() => onNavigate('catalog')}
              >
                <Icon name="Grid3x3" size={18} />
                Catalog
              </Button>
              <Button 
                variant={activeSection === 'library' ? 'default' : 'ghost'} 
                className="gap-2 relative"
                onClick={() => onNavigate('library')}
              >
                <Icon name="Library" size={18} />
                Library
                {libraryCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {libraryCount}
                  </span>
                )}
              </Button>
              <Button 
                variant={activeSection === 'profile' ? 'default' : 'ghost'} 
                className="gap-2"
                onClick={() => onNavigate('profile')}
              >
                <Icon name="User" size={18} />
                Profile
              </Button>
            </nav>
          </div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          <Button variant="outline" size="icon" className="hidden lg:flex">
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
