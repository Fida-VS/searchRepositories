import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addSelectValue } from "../../store/app-slice";
import {  setCurrentPage } from "../../store/repository-slice";
import { createPages } from "../../utils/create-pages";



export const Footer: React.FC = () => {

    const [selectValue, setSelectValue] = useState('10');
    const dispatch = useAppDispatch();
    
    //const searchValue = useAppSelector(state => state.app.searchValue);
    //const sortValue = useAppSelector(state => state.app.sortValue);
    const totalCount = useAppSelector(state => state.repositories.totalCount);
    const currentPage = useAppSelector(state => state.repositories.currentPage);

    console.log(totalCount)
    const pagesCount = Math.ceil(totalCount/Number(selectValue));

    const pages: number[] = [];
    createPages(pages, pagesCount, currentPage);
    

const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    dispatch(addSelectValue(selectValue));
}

    return (
        <div className="footer">

           <label>Rows per page: 
 <select value={selectValue} id="rows" name="rows" onChange={onChangeHandler}>
 <option value="10">10</option>
 <option value="30">30</option>
 <option value="50">50</option>
 <option value="100">100</option>
</select>
</label>

<div className="buttons">
    <button>prev</button>

<div className="pages">
    {pages.map((page, index) => <span 
    key={index} 
    className={currentPage === page ? "current-page" : "page"}
    onClick={() => dispatch(setCurrentPage(page))}
    >{page}</span>)}
</div>

    <button>next</button>
</div>
        </div>
    )
}