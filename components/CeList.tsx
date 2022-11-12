import { CraftEssence, SortOption } from "../types";
import { FixedSizeGrid as Grid } from "react-window";
import { CeCard } from "../components/CeCard";

type Props = {
  craftEssences: CraftEssence[];
  sortOption: SortOption;
};

export const CeList = ({ craftEssences, sortOption }: Props) => {
  const sortedCes = [...craftEssences];

  // sort by ascending base atk
  sortedCes.sort((first, second) => {
    if (sortOption === SortOption.alpAsc) {
      return first.name > second.name ? 1 : -1;
    }
    if (sortOption === SortOption.alpDesc) {
      return first.name < second.name ? 1 : -1;
    }
    if (sortOption === SortOption.atkAsc) {
      return first.atkBase > second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOption.atkDesc) {
      return first.atkBase < second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOption.hpAsc) {
      return first.hpBase > second.hpBase ? 1 : -1;
    }
    if (sortOption === SortOption.hpDesc) {
      return first.hpBase < second.hpBase ? 1 : -1;
    }
    return 0;
  });

  const colsCount = 5;
  const rowsCount = Math.floor(sortedCes.length / colsCount);

  return (
    <Grid<CraftEssence[]>
      columnCount={colsCount}
      columnWidth={250}
      rowCount={rowsCount}
      rowHeight={500}
      height={800}
      width={1250}
      itemData={sortedCes}
    >
      {CeCard}
    </Grid>
  );
};
