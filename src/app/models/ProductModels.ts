
export interface PricePropertiesModel {
  price: number; // 200, 300, 3000
  property: string; // 100gr, 200gr, 2kg
}

export interface PriceModel {
  title: string; // Weight
  // prices: number[]; // 200, 300, 3000
  // price_properties: string[]; // 100gr, 200gr, 2kg
  properties: PricePropertiesModel[];
}

export interface ProductModel {
  id: string;
  name: string;
  //  summary: string;
  //  meta_title: string;
  //  meta_keywords: string;
  //  meta_description: string;
  //  description: string;
  //  contact_id: string;
  //  create_datetime: Date;
  //  edit_datetime: Date;
  //  status: string;
  //  type_id: string;
  //  image_id: string;
  //  image_filename: string;
  //  video_url: string | null;
  //  sku_id: string;
  //  ext: string;
  //  url: string;
  //  rating: number;
  price: PriceModel;
  //  compare_price: number;
  // currency: string;
  //  min_price: number;
  //  max_price: number;
  //  tax_id: string;
  //  count: number | null;
  //  cross_selling: any;
  //  upselling: any;
  //  rating_count: string;
  //  total_sales: number;
  category_id: string;
  //  badge: string;
  //  sku_type: string;
  //  base_price_selectable: number;
  //  compare_price_selectable: string;
  //  purchase_price_selectable: string;
  //  sku_count: string;
  //  total_sales_html: string;
  //  rating_html: string;
  image_url: string[];
}
