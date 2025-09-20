export interface Product {
  product_id: string;
  product_code: string;
  product_name: string;
  unit_code: string;
  price: number;
}

export interface Owner {
  owner_id: string,
  owner_code: string,
  owner_name: string,
  address: string,
  phone: string,
}

export interface SaleOrder {
  docutment_id: string
  docutment_no: string,
  document_date: string,
  owner_id: string
  owner_code: string,
  owner_name: string,
  address: string,
  phone: string,
  product_id: string
  product_code: string,
  product_name: string
  qty: number,
  price: number,
  total: number,
}