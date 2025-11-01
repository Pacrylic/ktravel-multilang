import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { Loader2, Globe } from "lucide-react";
import { categoryIcons } from "@/types/category";
import TopSlotAdCarousel from "@/components/TopSlotAd";
import BottomBoxAds from "@/components/BottomBoxAds";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const languageNames: Record<Language, string> = {
  en: "English (ENG)",
  ko: "한국어 (KOR)",
  zh: "中文 (CHN)",
  ja: "日本語 (JPN)",
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  
  // Fetch translations from database
  const { data: categories, isLoading: categoriesLoading } = trpc.content.getTranslations.useQuery({ 
    language 
  });
  
  // Fetch top slot ads
  const { data: topSlotAds, isLoading: topAdsLoading } = trpc.content.getTopSlotAds.useQuery({ 
    language 
  });
  
  // Fetch bottom box ads
  const { data: bottomBoxAds, isLoading: bottomAdsLoading } = trpc.content.getBottomBoxAds.useQuery({ 
    language 
  });
  
  const loading = categoriesLoading || topAdsLoading || bottomAdsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const welcomeTexts: Record<Language, { title: string; description: string }> = {
    en: {
      title: "Welcome to Korea!",
      description: "Your comprehensive digital guide for traveling in Korea. Access essential information about airports, transportation, attractions, and more - all in one place.",
    },
    ko: {
      title: "한국에 오신 것을 환영합니다!",
      description: "한국 여행을 위한 종합 디지털 가이드입니다. 공항, 교통, 관광지 등 필수 정보를 한 곳에서 확인하세요.",
    },
    zh: {
      title: "欢迎来到韩国!",
      description: "您在韩国旅行的综合数字指南。在一个地方获取有关机场、交通、景点等的基本信息。",
    },
    ja: {
      title: "韓国へようこそ!",
      description: "韓国旅行のための包括的なデジタルガイドです。空港、交通、観光地などの重要な情報を一か所で確認できます.",
    },
  };

  const welcome = welcomeTexts[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🇰🇷</div>
            <div>
              <h1 className="text-2xl font-bold text-primary">KTRAVEL</h1>
              <p className="text-sm text-muted-foreground">Smart Digital Travel Guide</p>
            </div>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-[180px]">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languageNames).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Top Slot Ads */}
      {topSlotAds && <TopSlotAdCarousel ads={topSlotAds} />}

      {/* Hero Section */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-4">{welcome.title}</h2>
        <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
          {welcome.description}
        </p>
        <p className="text-center text-red-600 font-semibold mb-12">
          *{language === 'ko' ? '아래로 스크롤하면서 원하는 키워드를 클릭하세요' : 
             language === 'zh' ? '向下滚动并点击您想了解的关键词' :
             language === 'ja' ? '下にスクロールして知りたいキーワードをクリックしてください' :
             'Please scroll down and click the keyword you want to know'}
        </p>
      </section>

      {/* Categories Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category: any) => {
            const icon = categoryIcons[category.id] || category.icon || "📍";
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">{category.subtitle}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Box Ads */}
      {bottomBoxAds && <BottomBoxAds ads={bottomBoxAds} />}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🇰🇷</div>
            <div>
              <h2 className="text-2xl font-bold">KTRAVEL</h2>
            </div>
          </div>
          
          <p className="text-slate-300 mb-8">
            Your smart digital travel guide for exploring Korea
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <span className="text-2xl">📱</span>
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <span className="text-2xl">🌐</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 text-center text-slate-400 text-sm">
            <p>© 2025 KTRAVEL. All rights reserved. NFC Korean Travel Guide Smart Digital Keyring</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
