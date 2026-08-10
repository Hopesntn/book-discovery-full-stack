/*********************************************************************************
* WEB422 - Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Fabricio Ortiz Fiallos Student ID: 120220249 Date: June 7, 2026
*
********************************************************************************/

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(' AND ');
  }

  const { data, error } = useSWR(
    router.isReady && qParts.length > 0
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10&fields=key,title,first_publish_year`
      : null,
    { keepPreviousData: true }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  if (error) {
    return <p>Unable to load books.</p>;
  }

  const searchSummary = Object.entries(router.query)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  return (
    <>
      <PageHeader text="Search Results" subtext={searchSummary} />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data?.docs?.map((book) => (
            <tr key={book.key} onClick={() => router.push(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
