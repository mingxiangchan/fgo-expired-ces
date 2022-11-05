import get from "axios";
import { readFileSync, writeFile } from "fs";

interface Event {
  id: number;
  name: string;
  type: string;
  shop: unknown[];
}

interface CraftEssence {
  name: string;
  skills: {
    functions: {
      funcGroup: {
        eventId: number;
      }[];
    }[];
  }[];
}

const queryFromApiOrCache = async <T>(
  source: string,
  cachePath: string
): Promise<T[]> => {
  try {
    // try to read the data from cache
    const cachedFile = readFileSync(cachePath);
    console.log(`read from cache: ${cachePath}`);
    const data = JSON.parse(cachedFile.toString()) as T[];
    return data;
  } catch (error) {
    // get a fresh copy if possible
    const response = await get(source);

    // asynchronously write the cache to a file
    writeFile(cachePath, JSON.stringify(response.data), (msg: unknown) =>
      console.log(msg)
    );
    console.log(`read from api: ${source}`);

    const data = response.data as T[];
    return data;
  }
};

const parseEquips = async (eventIds: Set<number>): Promise<CraftEssence[]> => {
  const source = "https://api.atlasacademy.io/export/NA/nice_equip.json";
  const cachePath = "./equip.json";
  const craftEssences = await queryFromApiOrCache<CraftEssence>(
    source,
    cachePath
  );

  const expiredCraftEssences: CraftEssence[] = [];

  for (const ce of craftEssences) {
    const events = new Set<number>();
    for (const skill of ce.skills) {
      for (const func of skill.functions) {
        for (const effect of func.funcGroup) {
          if (effect.eventId && eventIds.has(effect.eventId)) {
            events.add(effect.eventId);
          }
        }
      }
    }

    if (events.size > 1) {
      expiredCraftEssences.push(ce);
    }
  }

  console.log(expiredCraftEssences.length);
  return expiredCraftEssences;
};

const parseEvents = async (): Promise<Set<number>> => {
  const source = "https://api.atlasacademy.io/export/NA/nice_event.json";
  const cachePath = "./event.json";
  const events = await queryFromApiOrCache<Event>(source, cachePath);
  const relevantEvents = new Set<number>();

  for (const event of events) {
    if (event.type === "eventQuest" && event.shop.length > 0) {
      relevantEvents.add(event.id);
    }
  }

  return relevantEvents;
};

const main = async () => {
  const eventIds = await parseEvents();
  const expiredCraftEssences = await parseEquips(eventIds);

  const resultPath = "./public/results.json";
  writeFile(resultPath, JSON.stringify(expiredCraftEssences), (msg: unknown) =>
    console.log(msg)
  );
};

main();
