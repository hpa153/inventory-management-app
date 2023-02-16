import { BiSearch } from 'react-icons/bi';

import './Search.scss';

const Search = ({
  searchValue, 
  handleSearchInput
}: {
  searchValue: string, 
  handleSearchInput: React.ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <div className='search'>
      <BiSearch size={18} className='icon' />
      <input 
        type="text" 
        placeholder="Search Product"
        value={searchValue}
        onChange={handleSearchInput} 
      />
    </div>
  )
};

export default Search;
