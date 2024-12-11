import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Magazine } from '../../models/Magazine';

let magazinesCache: Magazine[] = [];
let isCacheLoaded = false;

const loadMagazines = async (): Promise<void> => {
  if (isCacheLoaded) return;
  try {
    const filePath = path.join(process.cwd(), 'data', 'magazines.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    magazinesCache = JSON.parse(fileContents) as Magazine[];
    isCacheLoaded = true;
    console.log('Magazines data loaded into memory.');
  } catch (error) {
    console.error('Failed to load magazines data:', error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    await loadMagazines();
    res.status(200).json(magazinesCache);
  } catch (error) {
    console.error('Error in magazines handler:', error);
    res.status(500).json({ error: 'Failed to load magazines data' });
  }
}
