-- Migration V2: searches tablosuna category kolonu ekle
ALTER TABLE public.searches ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'otel';
CREATE INDEX IF NOT EXISTS idx_searches_category ON public.searches(category);
