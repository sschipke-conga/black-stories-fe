import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import { setNavSubHeader, setSearchText, toggleSearchBar, toggleMobileMenu } from '../../actions';
import './SearchBar.scss';

export const SearchBar = ({setNavSubHeader, setSearchText, toggleSearchBar, isOpen, toggleMobileMenu, isMobileMenuOpen}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchComplete, setSearchComplete] = useState(false);
  useEffect(() => {
    return () => {
      setSearchComplete(false);
    }
  })

  if(isSearchComplete) {
    toggleSearchBar();
    if(isMobileMenuOpen) {
      toggleMobileMenu();
    }
    return <Redirect to="/search" />
  }
  
  let hideClass = !isOpen ? " hide" : " show";

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSearchInput = searchInput.trim().toLowerCase();
    if (!cleanSearchInput) {
      return
    }
    setNavSubHeader(cleanSearchInput);
    setSearchText(cleanSearchInput);
    setSearchInput("");
    setSearchComplete(true);
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <form 
    className={"search-form" + hideClass}
    onSubmit={e => handleSubmit(e)}
    >
      <input 
        className="searchInput"
        type="text"
        value={searchInput}
        onChange={e => handleChange(e)}
        onKeyPress={(e) => handleEnter(e)}
      />
      <button 
        className="search-button"
        type="submit"
        tabIndex="-1"
      >
        <svg 
        className="search-icon-svg"
        id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="22.04" height="22.04019" viewBox="0 0 22.04 22.04019">
          <path className="cls-3" d="M2.50042,22.04019A2.5,2.5,0,0,1,.73284,17.77261l6.874-6.874A2.49973,2.49973,0,1,1,11.142,14.43374l-6.874,6.874A2.49107,2.49107,0,0,1,2.50042,22.04019Z"/><path className="cls-3" d="M14.68108,14.716a7.3519,7.3519,0,1,1,5.20459-2.15283A7.33693,7.33693,0,0,1,14.68108,14.716Zm0-9.7168A2.35395,2.35395,0,1,0,16.351,5.6896,2.35486,2.35486,0,0,0,14.68108,4.99917Z"/>
        </svg>
      </button>
    </form>

  )

}

export const mapStateToProps = state => ({
  searchInput: state.data.searchText,
  isOpen: state.screen.search_bar_open,
  isMobileMenuOpen: state.screen.mobile_menu_open
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setNavSubHeader, setSearchText, toggleSearchBar, toggleMobileMenu }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);