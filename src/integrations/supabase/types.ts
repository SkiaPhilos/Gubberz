export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18";
  };
  public: {
    Tables: {
      campaigns: {
        Row: {
          active: boolean;
          badge: string | null;
          body: string | null;
          created_at: string;
          cta_href: string | null;
          cta_label: string | null;
          ends_at: string | null;
          headline: string;
          id: string;
          image: string | null;
          name: string;
          product_slugs: string[];
          slug: string;
          starts_at: string | null;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          badge?: string | null;
          body?: string | null;
          created_at?: string;
          cta_href?: string | null;
          cta_label?: string | null;
          ends_at?: string | null;
          headline: string;
          id?: string;
          image?: string | null;
          name: string;
          product_slugs?: string[];
          slug: string;
          starts_at?: string | null;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          badge?: string | null;
          body?: string | null;
          created_at?: string;
          cta_href?: string | null;
          cta_label?: string | null;
          ends_at?: string | null;
          headline?: string;
          id?: string;
          image?: string | null;
          name?: string;
          product_slugs?: string[];
          slug?: string;
          starts_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          blurb: string | null;
          created_at: string;
          id: string;
          name: string;
          published: boolean;
          slug: string;
          sort_order: number;
        };
        Insert: {
          blurb?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          published?: boolean;
          slug: string;
          sort_order?: number;
        };
        Update: {
          blurb?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          published?: boolean;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      home_sections: {
        Row: {
          body: string | null;
          category_slugs: string[];
          character_key: string | null;
          created_at: string;
          cta_href: string | null;
          cta_label: string | null;
          ends_at: string | null;
          eyebrow: string | null;
          id: string;
          layout: string;
          media_key: string | null;
          product_slugs: string[];
          published: boolean;
          section_type: Database["public"]["Enums"]["home_section_type"];
          settings: Json;
          sort_order: number;
          starts_at: string | null;
          theme: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          body?: string | null;
          category_slugs?: string[];
          character_key?: string | null;
          created_at?: string;
          cta_href?: string | null;
          cta_label?: string | null;
          ends_at?: string | null;
          eyebrow?: string | null;
          id?: string;
          layout?: string;
          media_key?: string | null;
          product_slugs?: string[];
          published?: boolean;
          section_type: Database["public"]["Enums"]["home_section_type"];
          settings?: Json;
          sort_order?: number;
          starts_at?: string | null;
          theme?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string | null;
          category_slugs?: string[];
          character_key?: string | null;
          created_at?: string;
          cta_href?: string | null;
          cta_label?: string | null;
          ends_at?: string | null;
          eyebrow?: string | null;
          id?: string;
          layout?: string;
          media_key?: string | null;
          product_slugs?: string[];
          published?: boolean;
          section_type?: Database["public"]["Enums"]["home_section_type"];
          settings?: Json;
          sort_order?: number;
          starts_at?: string | null;
          theme?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      inventory_movements: {
        Row: {
          changed_by: string;
          created_at: string;
          delta: number;
          id: string;
          product_id: string;
          reason: string;
        };
        Insert: {
          changed_by: string;
          created_at?: string;
          delta: number;
          id?: string;
          product_id: string;
          reason: string;
        };
        Update: {
          changed_by?: string;
          created_at?: string;
          delta?: number;
          id?: string;
          product_id?: string;
          reason?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          image: string | null;
          name: string;
          order_id: string;
          product_id: string | null;
          qty: number;
          unit_price: number;
        };
        Insert: {
          id?: string;
          image?: string | null;
          name: string;
          order_id: string;
          product_id?: string | null;
          qty: number;
          unit_price: number;
        };
        Update: {
          id?: string;
          image?: string | null;
          name?: string;
          order_id?: string;
          product_id?: string | null;
          qty?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      order_status_events: {
        Row: {
          changed_by: string;
          created_at: string;
          from_status: string | null;
          id: string;
          note: string | null;
          order_id: string;
          to_status: string;
        };
        Insert: {
          changed_by: string;
          created_at?: string;
          from_status?: string | null;
          id?: string;
          note?: string | null;
          order_id: string;
          to_status: string;
        };
        Update: {
          changed_by?: string;
          created_at?: string;
          from_status?: string | null;
          id?: string;
          note?: string | null;
          order_id?: string;
          to_status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_status_events_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          address: string;
          city: string;
          code: string;
          created_at: string;
          customer_name: string;
          delivery_fee: number;
          discount: number;
          email: string | null;
          id: string;
          notes: string | null;
          payment_method: string;
          payment_proof: string | null;
          phone: string;
          status: string;
          subtotal: number;
          total: number;
        };
        Insert: {
          address: string;
          city: string;
          code?: string;
          created_at?: string;
          customer_name: string;
          delivery_fee?: number;
          discount?: number;
          email?: string | null;
          id?: string;
          notes?: string | null;
          payment_method: string;
          payment_proof?: string | null;
          phone: string;
          status?: string;
          subtotal: number;
          total: number;
        };
        Update: {
          address?: string;
          city?: string;
          code?: string;
          created_at?: string;
          customer_name?: string;
          delivery_fee?: number;
          discount?: number;
          email?: string | null;
          id?: string;
          notes?: string | null;
          payment_method?: string;
          payment_proof?: string | null;
          phone?: string;
          status?: string;
          subtotal?: number;
          total?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          brand: string | null;
          category_id: string | null;
          cost: number | null;
          created_at: string;
          description: string | null;
          featured: boolean;
          features: string[];
          id: string;
          images: string[];
          low_stock_threshold: number;
          name: string;
          price: number;
          published: boolean;
          sale_price: number | null;
          short_description: string | null;
          sku: string;
          slug: string;
          specs: Json;
          stock: number;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          brand?: string | null;
          category_id?: string | null;
          cost?: number | null;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          features?: string[];
          id?: string;
          images?: string[];
          low_stock_threshold?: number;
          name: string;
          price: number;
          published?: boolean;
          sale_price?: number | null;
          short_description?: string | null;
          sku: string;
          slug: string;
          specs?: Json;
          stock?: number;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          brand?: string | null;
          category_id?: string | null;
          cost?: number | null;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          features?: string[];
          id?: string;
          images?: string[];
          low_stock_threshold?: number;
          name?: string;
          price?: number;
          published?: boolean;
          sale_price?: number | null;
          short_description?: string | null;
          sku?: string;
          slug?: string;
          specs?: Json;
          stock?: number;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      store_settings: {
        Row: {
          key: string;
          value: Json;
        };
        Insert: {
          key: string;
          value: Json;
        };
        Update: {
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      adjust_inventory: {
        Args: { p_delta: number; p_product_id: string; p_reason: string };
        Returns: number;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      lookup_order: { Args: { p_code: string; p_phone: string }; Returns: Json };
      place_order: {
        Args: {
          p_customer: Json;
          p_items: Json;
          p_method: string;
          p_proof: string;
        };
        Returns: Json;
      };
      set_order_status: {
        Args: { p_note?: string; p_order_id: string; p_status: string };
        Returns: string;
      };
    };
    Enums: {
      app_role: "admin" | "staff";
      home_section_type:
        | "hero"
        | "product_story"
        | "product_edit"
        | "category_index"
        | "product_rail"
        | "campaign"
        | "character"
        | "service_notes";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      home_section_type: [
        "hero",
        "product_story",
        "product_edit",
        "category_index",
        "product_rail",
        "campaign",
        "character",
        "service_notes",
      ],
    },
  },
} as const;
