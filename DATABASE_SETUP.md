# KTRAVEL Database Setup Guide

## Database Schema

This project uses MySQL database with the following tables:

### Tables
1. **categories** - Category metadata (id, icon, order)
2. **translations** - Multi-language content (en, ko, zh, ja)
3. **advertisements** - Ad content (top_slot, bottom_box, in_content)

## Setup Instructions

### 1. Database Configuration

Create a `.env` file in the project root with:

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-jwt-secret
OAUTH_SERVER_URL=https://api.manus.im
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Database Migration

```bash
pnpm db:push
```

This will create all necessary tables in your database.

### 4. Migrate Data

Run the migration script to populate the database:

```bash
node migrate-data.mjs
```

This will insert:
- 16 categories
- 64 translations (4 languages × 16 categories)
- 20 advertisements

### 5. Start Development Server

```bash
pnpm dev
```

## API Endpoints

All endpoints are available via tRPC:

- `content.getCategories` - Get all categories
- `content.getTranslations` - Get translations by language
- `content.getCategoryDetail` - Get specific category detail
- `content.getTopSlotAds` - Get top carousel ads
- `content.getBottomBoxAds` - Get bottom partner ads
- `content.getInContentAds` - Get in-content ads

## Database Management

Use the Management UI → Database panel to:
- View and edit data
- Add new translations
- Manage advertisements
- Full CRUD operations

## Notes

- All timestamps are stored in UTC
- Language enum: 'en' | 'ko' | 'zh' | 'ja'
- Ad types: 'top_slot' | 'bottom_box' | 'in_content'
