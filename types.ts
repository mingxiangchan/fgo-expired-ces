export interface Event {
  id: number;
  name: string;
  type: string;
  shop: unknown[];
  startedAt: number;
}

export interface CraftEssence {
  id: number;
  name: string;
  atkBase: number;
  hpBase: number;
  cost: number;
  extraAssets: {
    charaGraph: {
      equip: {
        [id: string]: string;
      };
    };
  };
  skills: {
    name: string;
    detail: string;
    functions: {
      funcGroup: {
        eventId: number;
      }[];
      svals: {
        EventId?: number;
      }[];
    }[];
  }[];
}

export interface PEvent {
  id: number;
  name: string;
  startedAt: string;
}

export interface PCraftEssence {
  id: number;
  name: string;
  imageUrl: string;
  effect: string;
  events: PEvent[];
  hasRevival: boolean;
}

export enum SortOptions {
  alpAsc = "Alphabetically (ascending)",
  alpDesc = "Alphabetically (descending)",
  atkAsc = "ATK (ascending)",
  atkDesc = "ATK (descending)",
  hpAsc = "HP (ascending)",
  hpDesc = "HP (descending)",
}
