export interface Event {
  id: number;
  name: string;
  type: string;
  shop: unknown[];
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
    }[];
  }[];
}

export enum SortOption {
  alpAsc = "Alphabetically (ascending)",
  alpDesc = "Alphabetically (descending)",
  atkAsc = "ATK (ascending)",
  atkDesc = "ATK (descending)",
  hpAsc = "HP (ascending)",
  hpDesc = "HP (descending)",
}
