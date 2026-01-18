import { Platform } from '@/types/game';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { allGenres } from '@/data/games';

interface FiltersProps {
  selectedPlatforms: Platform[];
  selectedGenres: string[];
  onPlatformToggle: (platform: Platform) => void;
  onGenreToggle: (genre: string) => void;
  onClearFilters: () => void;
}

export default function Filters({ 
  selectedPlatforms, 
  selectedGenres, 
  onPlatformToggle, 
  onGenreToggle,
  onClearFilters
}: FiltersProps) {
  const platforms: Platform[] = ['PC', 'Mobile', 'VR'];
  const hasActiveFilters = selectedPlatforms.length > 0 || selectedGenres.length > 0;

  return (
    <aside className="w-72 bg-card border-r border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Filters
        </h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Platforms
          </h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => {
              const isSelected = selectedPlatforms.includes(platform);
              return (
                <Badge
                  key={platform}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
                  onClick={() => onPlatformToggle(platform)}
                >
                  {platform}
                </Badge>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Genres
          </h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="flex flex-wrap gap-2">
              {allGenres.map(genre => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <Badge
                    key={genre}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => onGenreToggle(genre)}
                  >
                    {genre}
                  </Badge>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
