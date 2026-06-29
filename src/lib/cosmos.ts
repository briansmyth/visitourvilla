import { CosmosClient, Container } from '@azure/cosmos';

let bookingsContainer: Container | null = null;
let messagesContainer: Container | null = null;

function getClient(): CosmosClient {
  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;
  if (!endpoint || !key) throw new Error('COSMOS_ENDPOINT and COSMOS_KEY env vars are required');
  return new CosmosClient({ endpoint, key });
}

export async function getBookingsContainer(): Promise<Container> {
  if (bookingsContainer) return bookingsContainer;
  const client = getClient();
  const dbName = process.env.COSMOS_DB ?? 'visitourvilla';
  const { database } = await client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: 'bookings',
    partitionKey: { paths: ['/status'] },
  });
  bookingsContainer = container;
  return container;
}

export async function getMessagesContainer(): Promise<Container> {
  if (messagesContainer) return messagesContainer;
  const client = getClient();
  const dbName = process.env.COSMOS_DB ?? 'visitourvilla';
  const { database } = await client.databases.createIfNotExists({ id: dbName });
  const { container } = await database.containers.createIfNotExists({
    id: 'messages',
    partitionKey: { paths: ['/email'] },
  });
  messagesContainer = container;
  return container;
}

export async function getBookedDates(): Promise<{ start: string; end: string }[]> {
  try {
    const container = await getBookingsContainer();
    const { resources } = await container.items
      .query({
        query: "SELECT c.checkIn, c.checkOut FROM c WHERE c.status != 'declined'",
      })
      .fetchAll();
    return resources.map((r) => ({ start: r.checkIn, end: r.checkOut }));
  } catch {
    // Return hardcoded demo data if Cosmos is not yet configured
    return getDemoBookedRanges();
  }
}

export function getDemoBookedRanges(): { start: string; end: string }[] {
  return [
    { start: '2026-07-04', end: '2026-07-05' },
    { start: '2026-07-05', end: '2026-07-06' },
    { start: '2026-07-06', end: '2026-07-07' },
    { start: '2026-07-18', end: '2026-07-19' },
    { start: '2026-07-19', end: '2026-07-20' },
    { start: '2026-07-01', end: '2026-07-04' },
    { start: '2026-07-15', end: '2026-07-17' },
    { start: '2026-12-24', end: '2026-12-27' },
  ];
}
