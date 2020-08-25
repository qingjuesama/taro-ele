export interface CurrentAddress {
  id: string
  city: string
  address: string
  address_detail: string
  latitude: number
  longitude: number
  name: string
  phone: string
  sex: string
}

export interface Reducers {
  currentAddress: CurrentAddress
}
