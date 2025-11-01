import { Card, CardContent } from "@/components/ui/card";

interface BottomBoxAdsProps {
  ads: any[];
}

export default function BottomBoxAds({ ads }: BottomBoxAdsProps) {
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners & Events</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ads.map((ad) => (
            <a
              key={ad.id}
              href={ad.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={ad.imageUrl}
                    alt={ad.text}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{ad.text}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {ad.text.includes('Airport') ? 'Premium airport access with exclusive services' :
                     ad.text.includes('Metro') || ad.text.includes('T-Money') ? 'Unlimited travel card for Seoul' :
                     ad.text.includes('Translator') || ad.text.includes('Map') ? 'Real-time Korean translation app' :
                     ad.text.includes('Weather') ? 'Best rates at authorized exchangers' :
                     'Discover Seoul\'s finest restaurants'}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
