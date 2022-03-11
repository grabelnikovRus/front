export type Stage = 'conditions' | 'apartment' | 'apt-check' | 'register' | 'sms-confirm'

export interface IAddressFormData {
  address: string
  lat?: number
  lon?: number
}

export interface AptData {
  address: string
  area: number
  floor: number
  isInOperation: ['true' | 'false']
  isOwnership?: ['true' | 'false']
  isTransferAcceptanceCertificate?: ['true' | 'false']
  isMortgage: ['true' | 'false']
  objectType: ['flat' | 'apartment']
  price: number
  renovationType: ['fresh' | 'cosmetic' | 'none']
  renovationYear?: number
  roomType: ['0' | '1' | '2' | '3']
  peculiarities?: string[]
  releaseYear?: number
  releaseQuarter?: '1' | '2' | '3' | '4'
  developer?: string[]
}

export interface ILocalStoredData {
  address?: IAddressFormData
  apt?: AptData
}
