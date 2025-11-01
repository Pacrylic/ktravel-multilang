import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Content router for categories, translations, and advertisements
  content: router({
    getCategories: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    
    getTranslations: publicProcedure
      .input(z.object({ language: z.enum(["en", "ko", "zh", "ja"]) }))
      .query(async ({ input }) => {
        const categories = await db.getAllCategories();
        const translations = await db.getTranslationsByLanguage(input.language);
        
        // Combine categories with their translations
        return categories.map(category => {
          const translation = translations.find(t => t.categoryId === category.id);
          return {
            id: category.id,
            icon: category.icon,
            order: category.order,
            title: translation?.title || "",
            subtitle: translation?.subtitle || "",
            overview: translation?.overview || "",
            sections: translation?.sections || []
          };
        });
      }),
    
    getCategoryDetail: publicProcedure
      .input(z.object({ 
        categoryId: z.string(), 
        language: z.enum(["en", "ko", "zh", "ja"]) 
      }))
      .query(async ({ input }) => {
        const translation = await db.getTranslationByCategoryAndLanguage(
          input.categoryId,
          input.language
        );
        return translation;
      }),
    
    getTopSlotAds: publicProcedure
      .input(z.object({ language: z.enum(["en", "ko", "zh", "ja"]) }))
      .query(async ({ input }) => {
        return await db.getAdvertisementsByType("top_slot", input.language);
      }),
    
    getBottomBoxAds: publicProcedure
      .input(z.object({ language: z.enum(["en", "ko", "zh", "ja"]) }))
      .query(async ({ input }) => {
        return await db.getAdvertisementsByType("bottom_box", input.language);
      }),
    
    getInContentAds: publicProcedure
      .input(z.object({ 
        categoryId: z.string(), 
        language: z.enum(["en", "ko", "zh", "ja"]) 
      }))
      .query(async ({ input }) => {
        return await db.getInContentAdsByCategory(input.categoryId, input.language);
      }),
  }),
});

export type AppRouter = typeof appRouter;
