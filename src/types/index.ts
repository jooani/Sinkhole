
export type Report = {
    id: number;
    latitude: number;
    longitude: number;
    width: number;
    length: number;
    depth: number;
    description: string;
    contact: string;
    imageUrl?: string;
    approved: boolean;
  };