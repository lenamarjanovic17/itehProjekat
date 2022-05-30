
export interface Item {
  id?: number,
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  itemGroup?: ItemGroup,
  specification: Specification
}

export interface Specification {
  [key: string]: number | string
}

export interface ItemGroup {
  id?: number,
  name: string,
  parentGroup?: ItemGroup,
  children: ItemGroup[]
}

export interface Order {
  id?: number,
  targetLocation: TargetLocation,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED',
  acceptedAt: string,
  rejectedAt: string,
  delivereddAt: string,
  user: User,
  orderItems: OrderItem[]
}

export interface OrderItem {
  id?: number,
  itemName: string,
  count: number,
  itemPrice: number,
  item: Item,
  order: Order
}

export interface TargetLocation {
  phone: string,
  address: string,
  apartment?: string,
  floor?: string,
  note?: string
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  admin: boolean
}