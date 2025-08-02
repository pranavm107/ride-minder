export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          attendance_date: string
          cab_id: string
          created_at: string | null
          drop_status: boolean | null
          drop_time: string | null
          id: string
          pickup_status: boolean | null
          pickup_time: string | null
          student_id: string
        }
        Insert: {
          attendance_date?: string
          cab_id: string
          created_at?: string | null
          drop_status?: boolean | null
          drop_time?: string | null
          id?: string
          pickup_status?: boolean | null
          pickup_time?: string | null
          student_id: string
        }
        Update: {
          attendance_date?: string
          cab_id?: string
          created_at?: string | null
          drop_status?: boolean | null
          drop_time?: string | null
          id?: string
          pickup_status?: boolean | null
          pickup_time?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      cabs: {
        Row: {
          available_seats: number
          cab_number: string
          created_at: string | null
          driver_id: string | null
          id: string
          is_active: boolean | null
          registration_number: string | null
          route_id: string | null
          total_seats: number
          vehicle_type: string | null
        }
        Insert: {
          available_seats?: number
          cab_number: string
          created_at?: string | null
          driver_id?: string | null
          id?: string
          is_active?: boolean | null
          registration_number?: string | null
          route_id?: string | null
          total_seats?: number
          vehicle_type?: string | null
        }
        Update: {
          available_seats?: number
          cab_number?: string
          created_at?: string | null
          driver_id?: string | null
          id?: string
          is_active?: boolean | null
          registration_number?: string | null
          route_id?: string | null
          total_seats?: number
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cabs_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cabs_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      camera_events: {
        Row: {
          activated_at: string | null
          cab_id: string
          camera_password: string | null
          created_at: string | null
          deactivated_at: string | null
          event_type: string
          id: string
          is_active: boolean | null
          stream_url: string | null
          triggered_by: string | null
        }
        Insert: {
          activated_at?: string | null
          cab_id: string
          camera_password?: string | null
          created_at?: string | null
          deactivated_at?: string | null
          event_type: string
          id?: string
          is_active?: boolean | null
          stream_url?: string | null
          triggered_by?: string | null
        }
        Update: {
          activated_at?: string | null
          cab_id?: string
          camera_password?: string | null
          created_at?: string | null
          deactivated_at?: string | null
          event_type?: string
          id?: string
          is_active?: boolean | null
          stream_url?: string | null
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "camera_events_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camera_events_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          cab_id: string | null
          created_at: string | null
          experience_years: number | null
          id: string
          is_active: boolean | null
          license_expiry: string | null
          license_number: string
          user_id: string
        }
        Insert: {
          cab_id?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          license_expiry?: string | null
          license_number: string
          user_id: string
        }
        Update: {
          cab_id?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          license_expiry?: string | null
          license_number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_bookings: {
        Row: {
          booking_date: string
          cab_id: string
          created_at: string | null
          drop_location: string
          guest_email: string
          guest_name: string
          guest_phone: string | null
          id: string
          payment_status: string | null
          pickup_location: string
          register_number: string | null
          status: string | null
        }
        Insert: {
          booking_date?: string
          cab_id: string
          created_at?: string | null
          drop_location: string
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          id?: string
          payment_status?: string | null
          pickup_location: string
          register_number?: string | null
          status?: string | null
        }
        Update: {
          booking_date?: string
          cab_id?: string
          created_at?: string | null
          drop_location?: string
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          id?: string
          payment_status?: string | null
          pickup_location?: string
          register_number?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guest_bookings_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
        ]
      }
      live_locations: {
        Row: {
          cab_id: string
          created_at: string | null
          heading: number | null
          id: string
          is_active: boolean | null
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string | null
        }
        Insert: {
          cab_id: string
          created_at?: string | null
          heading?: number | null
          id?: string
          is_active?: boolean | null
          latitude: number
          longitude: number
          speed?: number | null
          timestamp?: string | null
        }
        Update: {
          cab_id?: string
          created_at?: string | null
          heading?: number | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_locations_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          guest_booking_id: string | null
          id: string
          month_year: string | null
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          student_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          guest_booking_id?: string | null
          id?: string
          month_year?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          guest_booking_id?: string | null
          id?: string
          month_year?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_guest_booking_id_fkey"
            columns: ["guest_booking_id"]
            isOneToOne: false
            referencedRelation: "guest_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string | null
          distance_km: number | null
          drop_coordinates: Json | null
          drop_location: string
          estimated_duration_minutes: number | null
          id: string
          pickup_coordinates: Json | null
          pickup_location: string
          route_name: string
        }
        Insert: {
          created_at?: string | null
          distance_km?: number | null
          drop_coordinates?: Json | null
          drop_location: string
          estimated_duration_minutes?: number | null
          id?: string
          pickup_coordinates?: Json | null
          pickup_location: string
          route_name: string
        }
        Update: {
          created_at?: string | null
          distance_km?: number | null
          drop_coordinates?: Json | null
          drop_location?: string
          estimated_duration_minutes?: number | null
          id?: string
          pickup_coordinates?: Json | null
          pickup_location?: string
          route_name?: string
        }
        Relationships: []
      }
      sos_alerts: {
        Row: {
          alert_type: string
          cab_id: string
          created_at: string | null
          id: string
          is_resolved: boolean | null
          location: Json | null
          message: string | null
          resolved_at: string | null
          resolved_by: string | null
          triggered_by: string
        }
        Insert: {
          alert_type?: string
          cab_id: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          location?: Json | null
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          triggered_by: string
        }
        Update: {
          alert_type?: string
          cab_id?: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          location?: Json | null
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          triggered_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "sos_alerts_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          cab_id: string | null
          created_at: string | null
          drop_location: string
          id: string
          is_regular: boolean | null
          parent_id: string | null
          pickup_location: string
          register_number: string
          user_id: string
        }
        Insert: {
          cab_id?: string | null
          created_at?: string | null
          drop_location: string
          id?: string
          is_regular?: boolean | null
          parent_id?: string | null
          pickup_location: string
          register_number: string
          user_id: string
        }
        Update: {
          cab_id?: string | null
          created_at?: string | null
          drop_location?: string
          id?: string
          is_regular?: boolean | null
          parent_id?: string | null
          pickup_location?: string
          register_number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_cab_id_fkey"
            columns: ["cab_id"]
            isOneToOne: false
            referencedRelation: "cabs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "admin" | "driver" | "student" | "parent" | "guest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "driver", "student", "parent", "guest"],
    },
  },
} as const
