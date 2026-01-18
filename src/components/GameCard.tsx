import { Game } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
  onAddToLibrary: (gameId: number) => void;
}

export default function GameCard({ game, onAddToLibrary }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group overflow-hidden bg-card border-border hover-lift card-glow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={game.coverImage} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
            <Icon name="Star" size={12} className="mr-1" />
            {game.rating}
          </Badge>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {game.platforms.map(platform => (
              <Badge key={platform} variant="secondary" className="text-xs backdrop-blur-sm bg-secondary/20">
                {platform}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{game.title}</h3>
          
          <p className="text-sm text-gray-300 mb-1">{game.developer}</p>
          
          <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{game.description}</p>
            
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-bold text-primary">
                {game.price === 0 ? 'Free' : `$${game.price}`}
              </span>
              
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToLibrary(game.id);
                }}
                className={`${game.inLibrary ? 'bg-muted hover:bg-muted/80' : 'bg-primary hover:bg-primary/90'} transition-all`}
                disabled={game.inLibrary}
              >
                <Icon name={game.inLibrary ? "Check" : "Plus"} size={16} className="mr-2" />
                {game.inLibrary ? 'In Library' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
