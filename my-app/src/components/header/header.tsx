import { useState, ChangeEvent, MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../hook";
import { addSearchValue } from "../../store/repository-slice";
import { fetchRepos, setCurrentPage } from "../../store/repository-slice";


export const Header: React.FC = () => {

    const [searchValue, setSearchValue] = useState('');

    const currentPage = useAppSelector(state => state.repositories.currentPage);
    
    const dispatch = useAppDispatch();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if(searchValue){
            dispatch(setCurrentPage(1));
           dispatch(fetchRepos({searchValue, currentPage}));
            setSearchValue('');
            dispatch(addSearchValue(searchValue));
        }
    }


    return (
        <div className="header">
            <form>
            <input placeholder="Введите поисковый запрос" value={searchValue} onChange={onChangeHandler}/>
            <button name="search-input" type="button" onClick={onClickHandler}>Искать</button>
            </form>
            
        </div>
    )
}