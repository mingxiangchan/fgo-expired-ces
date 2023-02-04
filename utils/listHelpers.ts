import { PCraftEssence, SortOptions } from "../types";

export const filterByRarity = (
  craftEssences: PCraftEssence[],
  rarities: number[]
): PCraftEssence[] => {
  const raritiesSet = new Set(rarities);

  return craftEssences.filter((ce) => {
    return raritiesSet.has(ce.rarity);
  });
};

export const filterByHasEvent = (
  craftEssences: PCraftEssence[],
  includeNonEvent: boolean
): PCraftEssence[] => {
  return craftEssences.filter((ce) => {
    return ce.hasEvent === !includeNonEvent;
  });
};

export const sortByOption = (
  craftEssences: PCraftEssence[],
  option: SortOptions
): PCraftEssence[] => {
  craftEssences.sort((first, second) => {
    if (option === SortOptions.alpAsc) {
      return first.name > second.name ? 1 : -1;
    }
    if (option === SortOptions.alpDesc) {
      return first.name < second.name ? 1 : -1;
    }
    if (option === SortOptions.atkAsc) {
      if (first.atkBase === second.atkBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.atkBase > second.atkBase ? 1 : -1;
    }
    if (option === SortOptions.atkDesc) {
      if (first.atkBase === second.atkBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.atkBase < second.atkBase ? 1 : -1;
    }
    if (option === SortOptions.hpAsc) {
      if (first.hpBase === second.hpBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.hpBase > second.hpBase ? 1 : -1;
    }
    if (option === SortOptions.hpDesc) {
      if (first.hpBase === second.hpBase) {
        return first.id > second.atkBase ? 1 : -1;
      }

      return first.hpBase < second.hpBase ? 1 : -1;
    }
    return 0;
  });

  return craftEssences;
};

// sort by ascending base atk
