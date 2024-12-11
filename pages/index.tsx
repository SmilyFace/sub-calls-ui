import MagazinesList from '../components/MagazinesList';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Magazines list</title>
      </Head>
      <MagazinesList />
    </div>
  );
}
