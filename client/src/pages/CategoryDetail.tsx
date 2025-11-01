import { useLanguage } from "@/contexts/LanguageContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { categoryIcons } from "@/types/category";
import InContentAdCard from "@/components/InContentAd";
import { trpc } from "@/lib/trpc";

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  
  // Fetch category detail from database
  const { data: category, isLoading } = trpc.content.getCategoryDetail.useQuery({
    categoryId: id || "",
    language
  });
  
  // Fetch in-content ads for this category
  const { data: inContentAds } = trpc.content.getInContentAds.useQuery({
    categoryId: id || "",
    language
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const icon = categoryIcons[id || ""] || "📍";
  const sections = category.sections as any[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{icon}</div>
            <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
            <p className="text-xl text-muted-foreground">{category.subtitle}</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{category.overview}</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections?.map((section: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl">{section.heading || section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-base leading-relaxed whitespace-pre-line">
                    {(section.text || section.content)?.split('\n').map((line: string, idx: number) => {
                      // Check if line contains a link
                      if (line.includes('🔗') && line.includes('http')) {
                        const parts = line.split(': ');
                        if (parts.length === 2) {
                          const linkText = parts[0];
                          const url = parts[1].trim();
                          return (
                            <div key={idx} className="flex items-start gap-2 my-1">
                              <span>{linkText}:</span>
                              <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                              >
                                {url}
                              </a>
                            </div>
                          );
                        }
                      }
                      return <div key={idx}>{line}</div>;
                    })}
                    
                    {/* Display links if they exist */}
                    {section.links && section.links.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {section.links.map((link: any, linkIdx: number) => (
                          <div key={linkIdx} className="flex items-start gap-2">
                            <span>🔗 {link.name}:</span>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                            >
                              {link.url}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* In-Content Ads for Nearby Categories */}
          {inContentAds && inContentAds.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                {id === "nearby-restaurants" ? "Featured Restaurants" : 
                 id === "nearby-hotels" ? "Featured Hotels" : "Featured Places"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inContentAds.map((ad: any) => (
                  <InContentAdCard key={ad.id} ad={ad} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
