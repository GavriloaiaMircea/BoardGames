import clsx from 'clsx';
import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronDoubleRight,
  HiChevronRight,
} from 'react-icons/hi';

export function Pagination({ itemsPerPage = 10, numberOfItems = 0 }) {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
  const currentPage = Number(search.get('page'));

  useEffect(() => {
    let correctPage = currentPage;
    let shouldRedirect = false;

    if (currentPage > numberOfPages) {
      correctPage = numberOfPages;
      shouldRedirect = true;
    }

    if (currentPage < 1) {
      correctPage = 1;
      shouldRedirect = true;
    }

    shouldRedirect && navigate(`?page=${correctPage}`);
  }, [currentPage, navigate, numberOfPages]);

  let minPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
  let maxPage =
    currentPage + 2 <= numberOfPages ? currentPage + 2 : numberOfPages;

  maxPage = maxPage + 2 - currentPage + minPage;
  if (currentPage >= minPage + 2) {
    minPage = minPage - (2 + currentPage - maxPage);
  }

  let links = [];
  for (let i = minPage; i <= maxPage; i++) {
    links.push(
      <Link
        key={i}
        to={`?page=${i}`}
        className={clsx(
          'p-2 aspect-square grow flex items-center justify-center',
          { 'rounded-full bg-stone-300': Number(currentPage) === i }
        )}
      >
        {i}
      </Link>
    );
  }

  if (currentPage > 1) {
    links.unshift(
      <Link key="first" to="?page=1">
        <HiChevronDoubleLeft />
      </Link>,
      <Link key="prev" to={`?page=${currentPage - 1}`}>
        <HiChevronLeft />
      </Link>
    );
  }

  if (currentPage < numberOfPages) {
    links.push(
      <Link key="next" to={`?page=${currentPage + 1}`}>
        <HiChevronRight />
      </Link>,
      <Link key="last" to={`?page=${numberOfPages}`}>
        <HiChevronDoubleRight />
      </Link>
    );
  }

  return (
    <section className="flex gap-2 items-center w-80">
      <h2 className="sr-only">Pagination</h2>
      {links}
    </section>
  );
}

/**
 * Mai trebuie sa facem:
 * 1. Extras current page, poate cu un custom hook
 * 2. Pus niste text sr-only in butoanele de next si prev
 */
