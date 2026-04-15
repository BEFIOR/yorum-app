export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      searches: {
        Row: {
          id: string;
          hotel_name: string;
          hotel_place_id: string;
          hotel_address: string;
          hotel_rating: number | null;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          hotel_name: string;
          hotel_place_id: string;
          hotel_address: string;
          hotel_rating?: number | null;
          category?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          hotel_name?: string;
          hotel_place_id?: string;
          hotel_address?: string;
          hotel_rating?: number | null;
          category?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      analyses: {
        Row: {
          id: string;
          search_id: string;
          analysis_text: string;
          raw_reviews: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          search_id: string;
          analysis_text: string;
          raw_reviews: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          search_id?: string;
          analysis_text?: string;
          raw_reviews?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analyses_search_id_fkey";
            columns: ["search_id"];
            isOneToOne: false;
            referencedRelation: "searches";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
