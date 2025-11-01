import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface InContentAdProps {
  ad: any;
}

export default function InContentAdCard({ ad }: InContentAdProps) {
  return (
    <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="h-full hover:shadow-xl transition-all border-2 border-yellow-200 bg-yellow-50/30">
        <div className="relative">
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
            SPONSORED
          </div>
          <img
            src={ad.imageUrl}
            alt={ad.text}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{ad.text}</CardTitle>
          <CardDescription>
            {ad.text.includes('Restaurant') || ad.text.includes('Food') ? 'Authentic Korean cuisine experience' :
             ad.text.includes('Hotel') || ad.text.includes('Stay') ? 'Comfortable accommodation in Seoul' :
             'Premium travel service'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">Featured</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
