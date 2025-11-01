import { drizzle } from "drizzle-orm/mysql2";
import { mysqlTable, int, varchar, text, timestamp, mysqlEnum, json } from "drizzle-orm/mysql-core";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define schema inline (since we can't import .ts files in .mjs)
const categories = mysqlTable("categories", {
  id: varchar("id", { length: 50 }).primaryKey(),
  icon: varchar("icon", { length: 10 }).notNull(),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

const translations = mysqlTable("translations", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: varchar("categoryId", { length: 50 }).notNull(),
  language: mysqlEnum("language", ["en", "ko", "zh", "ja"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: text("subtitle").notNull(),
  overview: text("overview").notNull(),
  sections: json("sections").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

const advertisements = mysqlTable("advertisements", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["top_slot", "bottom_box", "in_content"]).notNull(),
  position: int("position").notNull(),
  imageUrl: text("imageUrl").notNull(),
  linkUrl: text("linkUrl").notNull(),
  language: mysqlEnum("language", ["en", "ko", "zh", "ja"]).notNull(),
  text: text("text").notNull(),
  categoryId: varchar("categoryId", { length: 50 }),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Database connection
const db = drizzle(process.env.DATABASE_URL);

// Category icons mapping
const categoryIcons = {
  1: "✈️",
  2: "📅",
  3: "🏛️",
  4: "🚇",
  5: "🗺️",
  6: "📱",
  7: "🚨",
  8: "🌐",
  9: "💱",
  10: "🍜",
  11: "📶",
  12: "🛍️",
  13: "🌤️",
  14: "🎭",
  15: "🍽️",
  16: "🏨"
};

// Category ID mapping (number to string)
const categoryIdMap = {
  1: "incheon-airport",
  2: "reservation",
  3: "tourist-attractions",
  4: "transportation",
  5: "regional-info",
  6: "usim",
  7: "emergency",
  8: "translation",
  9: "money-exchange",
  10: "food-guide",
  11: "wifi",
  12: "shopping",
  13: "weather",
  14: "culture",
  15: "nearby-restaurants",
  16: "nearby-hotels"
};

async function migrateCategories() {
  console.log("Migrating categories...");
  
  const categoryData = [];
  for (let i = 1; i <= 16; i++) {
    categoryData.push({
      id: categoryIdMap[i],
      icon: categoryIcons[i],
      order: i
    });
  }
  
  await db.insert(categories).values(categoryData);
  console.log(`✓ Migrated ${categoryData.length} categories`);
}

async function migrateTranslations() {
  console.log("Migrating translations...");
  
  const languages = [
    { code: "en", file: "/home/ubuntu/ktravel_translation/content_english.json" },
    { code: "ko", file: "/home/ubuntu/ktravel_translation/content_korean.json" },
    { code: "zh", file: "/home/ubuntu/ktravel_translation/content_chinese.json" },
    { code: "ja", file: "/home/ubuntu/ktravel_translation/content_japanese.json" }
  ];
  
  let totalCount = 0;
  
  for (const lang of languages) {
    const content = JSON.parse(readFileSync(lang.file, "utf-8"));
    const translationData = [];
    
    for (const category of content.categories) {
      const categoryId = categoryIdMap[category.id];
      translationData.push({
        categoryId,
        language: lang.code,
        title: category.title,
        subtitle: category.subtitle,
        overview: category.content.overview,
        sections: category.content.sections
      });
    }
    
    await db.insert(translations).values(translationData);
    console.log(`✓ Migrated ${translationData.length} ${lang.code} translations`);
    totalCount += translationData.length;
  }
  
  console.log(`✓ Total translations migrated: ${totalCount}`);
}

async function migrateAds() {
  console.log("Migrating advertisements...");
  
  // Top slot ads (carousel)
  const topSlotAds = [
    {
      type: "top_slot",
      position: 1,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://english.visitkorea.or.kr",
      language: "en",
      text: "Discover Korea - Official Tourism Website",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 2,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.koreanair.com",
      language: "en",
      text: "Korean Air - Fly to Korea in Comfort",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 3,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.klook.com",
      language: "en",
      text: "Klook - Book Korea Tours & Activities",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 4,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.airbnb.com",
      language: "en",
      text: "Airbnb - Find Unique Stays in Korea",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 5,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.airport.kr/ap_cnt/en/index.do",
      language: "en",
      text: "Incheon Airport - Your Gateway to Korea",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 6,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.letskorail.com",
      language: "en",
      text: "KORAIL - Explore Korea by Train",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 7,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.creatrip.com",
      language: "en",
      text: "Creatrip - Korea Travel Made Easy",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 8,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.trazy.com",
      language: "en",
      text: "Trazy - Best Korea Tours & Tickets",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 9,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.agoda.com",
      language: "en",
      text: "Agoda - Book Hotels in Korea",
      categoryId: null,
      active: 1
    },
    {
      type: "top_slot",
      position: 10,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.booking.com",
      language: "en",
      text: "Booking.com - Find Your Perfect Stay",
      categoryId: null,
      active: 1
    }
  ];
  
  // Bottom box ads
  const bottomBoxAds = [
    {
      type: "bottom_box",
      position: 1,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.visitkorea.or.kr",
      language: "en",
      text: "Visit Korea Official Site",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 2,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.seoulmetro.co.kr",
      language: "en",
      text: "Seoul Metro Guide",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 3,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.tmoney.co.kr",
      language: "en",
      text: "T-Money Card",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 4,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://papago.naver.com",
      language: "en",
      text: "Papago Translator",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 5,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.kakaomap.com",
      language: "en",
      text: "Kakao Map",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 6,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.konest.com",
      language: "en",
      text: "Konest Korea Guide",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 7,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.koreaherald.com",
      language: "en",
      text: "Korea Herald News",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 8,
      imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.weather.go.kr",
      language: "en",
      text: "Korea Weather Service",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 9,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.airport.kr",
      language: "en",
      text: "Incheon Airport",
      categoryId: null,
      active: 1
    },
    {
      type: "bottom_box",
      position: 10,
      imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400&h=300&fit=crop&bri=1.3&sat=1.4",
      linkUrl: "https://www.koreatravel.com",
      language: "en",
      text: "Korea Travel Guide",
      categoryId: null,
      active: 1
    }
  ];
  
  const allAds = [...topSlotAds, ...bottomBoxAds];
  await db.insert(advertisements).values(allAds);
  console.log(`✓ Migrated ${allAds.length} advertisements`);
}

async function main() {
  try {
    console.log("Starting data migration...\n");
    
    await migrateCategories();
    await migrateTranslations();
    await migrateAds();
    
    console.log("\n✓ Data migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

main();
