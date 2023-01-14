import get from "axios";
import { readFileSync, writeFile } from "fs";
import { Event, CraftEssence, PCraftEssence, PEvent } from "../types";

const processCraftEssence = (
  ce: CraftEssence,
  eventIds: Set<number>,
  eventsMap: Map<number, PEvent>
): PCraftEssence => {
  let hasRevival = false;

  const processedEvents = Array.from(eventIds).map((eventId): PEvent => {
    const result = eventsMap.get(eventId) as PEvent;

    if (result.name.startsWith("Revival:")) {
      hasRevival = true;
    }

    return result;
  });

  const processedCe: PCraftEssence = {
    id: ce.id,
    name: ce.name,
    imageUrl: Object.values(ce.extraAssets.charaGraph.equip)[0],
    effect: ce.skills[0]?.detail,
    hasEvent: eventIds.size > 0,
    hasRevival: hasRevival,
    events: processedEvents,
    atkBase: ce.atkBase,
    hpBase: ce.hpBase,
  };

  return processedCe;
};

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

const parseEquips = async (
  eventsMap: Map<number, PEvent>
): Promise<PCraftEssence[]> => {
  const source = "https://api.atlasacademy.io/export/NA/nice_equip.json";
  const cachePath = "./cache/equip.json";

  const craftEssences = await queryFromApiOrCache<CraftEssence>(
    source,
    cachePath
  );

  const expiredEventIds = new Set(eventsMap.keys());

  const processedCraftEssences: PCraftEssence[] = [];

  for (const ce of craftEssences) {
    const eventIds = new Set<number>();

    for (const skill of ce.skills) {
      for (const func of skill.functions) {
        for (const sval of func.svals) {
          if (sval.EventId && expiredEventIds.has(sval.EventId)) {
            eventIds.add(sval.EventId);
          }
        }
      }
    }

    const processedCe = processCraftEssence(ce, eventIds, eventsMap);

    processedCraftEssences.push(processedCe);
  }

  console.log(processedCraftEssences.length);
  return processedCraftEssences;
};

const parseEvents = async (): Promise<Map<number, PEvent>> => {
  const source = "https://api.atlasacademy.io/export/NA/nice_event.json";
  const cachePath = "./cache/event.json";
  const events = await queryFromApiOrCache<Event>(source, cachePath);
  const relevantEvents: Map<number, PEvent> = new Map();

  for (const event of events) {
    if (event.type === "eventQuest" && event.shop.length > 0) {
      relevantEvents.set(event.id, {
        id: event.id,
        name: event.name,
        startedAt: new Date(event.startedAt * 1000).toISOString(),
      });
    }
  }

  return relevantEvents;
};

const main = async () => {
  const eventsMap = await parseEvents();
  const expiredCraftEssences = await parseEquips(eventsMap);

  const resultPath = "./public/results.json";
  writeFile(resultPath, JSON.stringify(expiredCraftEssences), (msg: unknown) =>
    console.log(msg)
  );
};

main();
