export interface ProductSpecs {
  CPU: string
  RAM: string
  Storage: string
  Display: string
  Battery: string
  Weight: string
  OS: string
}

export interface Product {
  id: string
  name: string
  price: number
  specs: ProductSpecs
}

export type SpecKey = keyof ProductSpecs

export const SPEC_LABELS: Record<SpecKey, string> = {
  CPU: 'Processor',
  RAM: 'Memory',
  Storage: 'Storage',
  Display: 'Display',
  Battery: 'Battery',
  Weight: 'Weight',
  OS: 'Operating system',
}
