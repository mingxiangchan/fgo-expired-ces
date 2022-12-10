import { CraftEssence, SortOptions } from "../types";
import { FixedSizeGrid as Grid } from "react-window";
import { CeCard } from "../components/CeCard";
import { NUM_COLUMNS } from "../utils/constants";

type Props = {
  craftEssences: CraftEssence[];
  sortOption: SortOptions;
};

export const CeList = ({ craftEssences, sortOption }: Props) => {
  const sortedCes = [...craftEssences];

  // sort by ascending base atk
  sortedCes.sort((first, second) => {
    if (sortOption === SortOptions.alpAsc) {
      return first.name > second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.alpDesc) {
      return first.name < second.name ? 1 : -1;
    }
    if (sortOption === SortOptions.atkAsc) {
      return first.atkBase > second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.atkDesc) {
      return first.atkBase < second.atkBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpAsc) {
      return first.hpBase > second.hpBase ? 1 : -1;
    }
    if (sortOption === SortOptions.hpDesc) {
      return first.hpBase < second.hpBase ? 1 : -1;
    }
    return 0;
  });

  const rowsCount = Math.floor(sortedCes.length / NUM_COLUMNS);

  return (
    <Grid<CraftEssence[]>
      columnCount={NUM_COLUMNS}
      columnWidth={1250}
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
