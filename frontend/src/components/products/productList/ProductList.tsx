import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import './ProductList.scss';
import { deleteAProduct, getAllProducts, newProductProps } from '../../../redux/features/product/productSlice';
import { SpinnerImg } from '../../loader/Loader';
import Search from '../../search/Search';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks';
import { selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import { FILTER_PRODUCTS } from '../../../redux/features/product/filterSlice';

const ProductList = ({products, isLoading}: {products: newProductProps[], isLoading: boolean}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const dispatch = useAppDispatch();

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    if(event.selected === 0) {
      return;
    }

    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  }

  // Search
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({products, searchValue}));
  }, [products, searchValue, dispatch]);

  const shortenText = (text: string, numOfChar: number) => {
    if(text.length > numOfChar) {
      return text.substring(0, numOfChar).concat("...");
    }

    return text;
  };

  const delProduct = async (id: string) => {
    await dispatch(deleteAProduct(id));
    await dispatch(getAllProducts());
  };

  const confirmDelete = (id: string) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure to delete this product?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id)
        },
        {
          label: 'Cancel',
        }
      ]
    });
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className='product-list'>
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span><Search searchValue={searchValue} handleSearchInput={handleSearchInput} /></span>
        </div>
        {isLoading && <SpinnerImg/>}
        <div className="table">
          {!isLoading && products.length === 0 ?
          (<p>-- No products available. Add products <Link to="/add-product">here</Link></p>) : (
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, idx) => {
                  const {_id, name, category, price, quantity} = product;
                  return (
                    <tr key={_id}>
                      <td>{idx + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${+price * +quantity}</td>
                      <td className='icons'>
                        <span>
                          <Link to={`/product-details/${_id}`}>
                            <AiOutlineEye size={25} color='purple'/>
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={18} color='green'/>
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={18} color='red' onClick={() => confirmDelete(_id!)} />
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
          }
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  )
};

export default ProductList;
