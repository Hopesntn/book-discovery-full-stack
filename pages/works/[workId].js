import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (!workId || isLoading) {
    return null;
  }

  if (error || !data || !data.title) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
