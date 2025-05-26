declare namespace kakao {
  export namespace maps {
    class Map {
      constructor(container: HTMLElement, options: any);
      setCenter(latlng: LatLng): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Marker {
      constructor(options: { map: Map; position: LatLng });
      setMap(map: Map | null): void;
    }

    class InfoWindow {
      constructor(options: { content: string });
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    namespace event {
      function addListener(target: any, type: string, handler: Function): void;
    }
  }
}