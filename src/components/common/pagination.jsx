import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types'


const Pagination = (props) => {
  
  const { itemCount, pageSize,onPageChange,currentPage } = props;
  const pageCount = Math.ceil(itemCount/pageSize);

  if(pageCount === 1 ) return null;
  const pages=_.range(1,pageCount+1);
  

  return <nav >
  <ul className="pagination">
   {pages.map((page) => {
    return  <li className={ currentPage === page ? 'page-item active' : 'page-item'} key={page}><a className="page-link" onClick={()=>onPageChange(page)}>{page}</a></li>
   })}
  </ul>
</nav>;
}

Pagination.propTypes = {
  itemCount : propTypes.number.isRequired,
  pageSize : propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange : propTypes.func.isRequired 
}
 
export default Pagination;