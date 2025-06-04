
export type Report = {
    id: number;
    nickname?: string;
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

  