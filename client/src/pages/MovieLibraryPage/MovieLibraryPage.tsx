import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useSocket as productSocket } from '../../contexts/product.context';
import { NavLink } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

/* COMPONENT THAT RENDERS MOVIE LIBRARY PAGE WITH PAGINATION */

const MovieLibraryPage = () => {
  const { products } = productSocket();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the products to be displayed on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // Slice the products array to get the products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  // Calculate the total number of pages based on the number of products and items per page
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col flex-wrap gap-4 justify-center items-center pt-48 py-24 max-w-screen-xl">
      {currentProducts.length > 0 ? (
        <>
          {/* Display current products */}
          <div className='flex flex-row flex-wrap gap-4 justify-center items-center px-4 sm:px-16'>
            {currentProducts.map((item, index) => (
              <NavLink to={`/product/${item._id}`} key={index}>
                <img src={item.image} alt="product image" className="h-60" loading="lazy" />
              </NavLink>
            ))}
          </div>
          
          {/* Pagination controls */}
          <div className="pagination-container flex flex-row gap-1 items-center">
            {/* Previous page button */}
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <IoIosArrowBack />
            </button>
            
            {/* Display current page and total pages */}
            <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
            
            {/* Next page button */}
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default MovieLibraryPage;
