import { useAppDispatch, useAppSelector } from "../../hook";
import {  setCurrentPage } from "../../store/repository-slice";
import { createPages } from "../../utils/create-pages";



export const Footer: React.FC = () => {

    const dispatch = useAppDispatch();
    
    const totalCount = useAppSelector(state => state.repositories.totalCount);
    const currentPage = useAppSelector(state => state.repositories.currentPage);
    const pagesCount = Math.ceil(totalCount/10);

    const pages: number[] = [];
    createPages(pages, pagesCount, currentPage);

    const prevHandler = () => {
        if(currentPage !== 1){
            dispatch(setCurrentPage(currentPage - 1))
        } else return;
    };

    const nextHandler = () => {
        if(currentPage !== pagesCount){
            dispatch(setCurrentPage(currentPage + 1))
        } else return;
    };
    

    return (
        <div className="footer">

<div className="buttons">
    <button onClick={prevHandler}>prev</button>

<div className="pages">
    {pages.map((page, index) => <span 
    key={index} 
    className={currentPage === page ? "current-page" : "page"}
    onClick={() => dispatch(setCurrentPage(page))}
    >{page}</span>)}
</div>

    <button onClick={nextHandler}>next</button>
</div>
        </div>
    )
}