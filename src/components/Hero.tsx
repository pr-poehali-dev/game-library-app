import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-24 px-6">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNENEFGMzciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC04Yy0xLjEgMC0yIC45LTIgMnY4YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Premium Gaming Collection</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Your Ultimate
            <span className="block text-gradient mt-2">Game Library</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover and collect games from every platform. PC, Mobile, VR – all in one elegant catalog. 
            Build your perfect library without downloads.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              <Icon name="Library" size={20} className="mr-2" />
              Browse Catalog
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2">
              <Icon name="TrendingUp" size={20} className="mr-2" />
              Top Rated
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">12,000+</div>
              <div className="text-muted-foreground">Games</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">3</div>
              <div className="text-muted-foreground">Platforms</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
