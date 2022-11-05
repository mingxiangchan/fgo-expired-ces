export interface Event {
  id: number;
  name: string;
  type: string;
  shop: unknown[];
}

export interface CraftEssence {
  name: string;
  skills: {
    functions: {
      funcGroup: {
        eventId: number;
      }[];
    }[];
  }[];
}
