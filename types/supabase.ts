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
      area: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      area_member: {
        Row: {
          area_id: string
          is_admin: boolean
          user_id: string
        }
        Insert: {
          area_id: string
          is_admin?: boolean
          user_id: string
        }
        Update: {
          area_id?: string
          is_admin?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'area_member_area_id_fkey'
            columns: ['area_id']
            referencedRelation: 'area'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'area_member_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_area_and_admin: {
        Args: {
          p_name: string
        }
        Returns: string
      }
      is_admin_of: {
        Args: {
          p_area_id: string
        }
        Returns: boolean
      }
      is_member_of: {
        Args: {
          p_area_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
