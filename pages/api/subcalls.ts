import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Call } from '../../models/Calls';

let subcallsCache: Call[] = [];
let isCacheLoaded = false;

const loadSubcalls = async (): Promise<void> => {
  if (isCacheLoaded) return;

  try {
    const filePath = path.join(process.cwd(), 'data', 'subcalls.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    subcallsCache = JSON.parse(fileContents) as Call[];
    isCacheLoaded = true;
    console.log('Subcalls data loaded into memory.');
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to load subcalls data:', errorMessage);
    throw new Error(`Failed to load subcalls data: ${errorMessage}`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    await loadSubcalls();

    const { magazineId } = req.query;
    if (magazineId && typeof magazineId === 'string') {
      const filteredSubcalls = subcallsCache.filter(
        (call) => call.magazineId.$oid === magazineId,
      );
      return res.status(200).json(filteredSubcalls);
    }

    res.status(200).json(subcallsCache);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in subcalls handler:', errorMessage);
    res.status(500).json({ error: errorMessage });
  }
}
