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
          area_id: string
          created_at: string
          name: string
        }
        Insert: {
          area_id?: string
          created_at?: string
          name: string
        }
        Update: {
          area_id?: string
          created_at?: string
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
            referencedColumns: ['area_id']
          },
          {
            foreignKeyName: 'area_member_area_id_fkey'
            columns: ['area_id']
            referencedRelation: 'vw_area_members'
            referencedColumns: ['area_id']
          },
          {
            foreignKeyName: 'area_member_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['user_id']
          },
        ]
      }
      profiles: {
        Row: {
          name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      vw_area_members: {
        Row: {
          area_id: string | null
          is_admin: boolean | null
          name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'area_member_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['user_id']
          },
        ]
      }
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
