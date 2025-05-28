
export type Report = {
    id: number;
    location: string;
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

  