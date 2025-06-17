export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          dietary_restrictions: string[]
          allergies: string[]
          favorite_cuisines: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          dietary_restrictions?: string[]
          allergies?: string[]
          favorite_cuisines?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          dietary_restrictions?: string[]
          allergies?: string[]
          favorite_cuisines?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      food_items: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          cuisine_type: string
          dietary_tags: string[]
          location: {
            lat: number
            lng: number
            address: string
          }
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url: string
          cuisine_type: string
          dietary_tags?: string[]
          location: {
            lat: number
            lng: number
            address: string
          }
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string
          cuisine_type?: string
          dietary_tags?: string[]
          location?: {
            lat: number
            lng: number
            address: string
          }
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_likes: {
        Row: {
          id: string
          user_id: string
          food_item_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          food_item_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          food_item_id?: string
          created_at?: string
        }
      }
    }
  }
} 