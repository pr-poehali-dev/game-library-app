import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Filters from '@/components/Filters';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { gamesData } from '@/data/games';
import { Game, Platform } from '@/types/game';

export default function Index() {
  const [games, setGames] = useState<Game[]>(gamesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'catalog' | 'library' | 'profile'>('catalog');

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesPlatform = selectedPlatforms.length === 0 || 
                             selectedPlatforms.some(p => game.platforms.includes(p));
      
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(g => game.genres.includes(g));
      
      return matchesSearch && matchesPlatform && matchesGenre;
    });
  }, [games, searchQuery, selectedPlatforms, selectedGenres]);

  const libraryGames = games.filter(g => g.inLibrary);

  const handleAddToLibrary = (gameId: number) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, inLibrary: true } : game
    ));
  };

  const handleRemoveFromLibrary = (gameId: number) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, inLibrary: false } : game
    ));
  };

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        libraryCount={libraryGames.length}
        onNavigate={setActiveSection}
        activeSection={activeSection}
      />

      {activeSection === 'catalog' && (
        <>
          <Hero />
          
          <div className="flex">
            <Filters
              selectedPlatforms={selectedPlatforms}
              selectedGenres={selectedGenres}
              onPlatformToggle={handlePlatformToggle}
              onGenreToggle={handleGenreToggle}
              onClearFilters={handleClearFilters}
            />

            <main className="flex-1 p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Game Catalog</h2>
                    <p className="text-muted-foreground">
                      {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="ArrowUpDown" size={16} className="mr-2" />
                      Sort by Rating
                    </Button>
                  </div>
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onAddToLibrary={handleAddToLibrary}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No games found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </Card>
              )}
            </main>
          </div>
        </>
      )}

      {activeSection === 'library' && (
        <main className="container mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">My Library</h2>
            <p className="text-muted-foreground">
              {libraryGames.length} {libraryGames.length === 1 ? 'game' : 'games'} in your collection
            </p>
          </div>

          {libraryGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {libraryGames.map(game => (
                <Card key={game.id} className="overflow-hidden hover-lift card-glow">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={game.coverImage} 
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{game.developer}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => handleRemoveFromLibrary(game.id)}
                      >
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Icon name="Library" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
              <p className="text-muted-foreground mb-6">
                Start adding games to build your collection
              </p>
              <Button onClick={() => setActiveSection('catalog')}>
                <Icon name="Grid3x3" size={16} className="mr-2" />
                Browse Catalog
              </Button>
            </Card>
          )}
        </main>
      )}

      {activeSection === 'profile' && (
        <main className="container mx-auto p-8 max-w-4xl">
          <Card className="p-8 animate-scale-in">
            <div className="flex items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="User" size={64} className="text-primary-foreground" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">Player Profile</h2>
                <p className="text-muted-foreground mb-6">Premium Member</p>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-primary mb-1">{libraryGames.length}</div>
                    <div className="text-sm text-muted-foreground">Games Owned</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {libraryGames.length > 0 
                        ? (libraryGames.reduce((sum, g) => sum + g.rating, 0) / libraryGames.length).toFixed(1)
                        : '0.0'}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Rating</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${libraryGames.reduce((sum, g) => sum + g.price, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Collection Value</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" size={18} className="mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Heart" size={18} className="mr-2" />
                    Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </main>
      )}
    </div>
  );
}