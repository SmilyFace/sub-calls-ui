import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Call } from '../../models/Calls';

let subcallsCache: Call[] = [];
let isCacheLoaded = false;

const loadSubcalls = async () => {
  if (isCacheLoaded) return;
  try {
    const filePath = path.join(process.cwd(), 'data', 'subcalls.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    subcallsCache = JSON.parse(fileContents);
    isCacheLoaded = true;
    console.log('Subcalls data loaded into memory.');
  } catch (error) {
    console.error('Failed to load subcalls data:', error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await loadSubcalls();

    const { magazineId } = req.query;
    if (magazineId) {
      const filteredSubcalls = subcallsCache.filter(
        (call: Call) => call.magazineId.$oid === magazineId,
      );
      return res.status(200).json(filteredSubcalls);
    }

    res.status(200).json(subcallsCache);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in subcalls handler:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unknown error in subcalls handler:', error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
