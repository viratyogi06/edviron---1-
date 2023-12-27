/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Pagination({ page, setPage, totalPageNo }: any) {
  const arr: any = [];
  const setPageNumber = () => {
    for (
      let totalPageNumber = 0;
      totalPageNumber < totalPageNo;
      totalPageNumber++
    ) {
      arr.push(totalPageNumber + 1);
    }
  };
  setPageNumber();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        {/* <div>
					<p className='text-sm text-gray-700'>
						Showing <span className='font-medium'>1</span> to <span className='font-medium'>10</span> of{' '}
						<span className='font-medium'>97</span> results
					</p>
				</div> */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {arr
              .map((p: any) => {
                return (
                  <span
                    onClick={() => setPage(p)}
                    key={p}
                    className={
                      "relative cursor-pointer z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
                      (p === page ? " bg-indigo-600 text-white" : " ")
                    }
                  >
                    {p}
                  </span>
                );
              })
              .slice(page >= 2 && page - 2, page + 1)}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
