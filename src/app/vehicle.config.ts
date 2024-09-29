export enum ESpaceStatus {
  RESERVED = 'RESERVED',
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED'
}

export interface IVehicleData {
  reservedDateTime?: Date;
  id?: string | number;
  img?: string;
  title?: string;
  spacePrice?: number | string,
  status?: 'RESERVED' | 'AVAILABLE' | 'OCCUPIED'
}
