import { useState, ChangeEvent, MouseEvent } from "react"
import { useAppDispatch } from "../../hook";
//import { fetchRepos } from "../../store/repository-slice";
import { addSearchValue, searchStart } from "../../store/app-slice";


export const Header: React.FC = () => {

    const [searchValue, setSearchValue] = useState('');

    

    const dispatch = useAppDispatch();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if(searchValue){
            dispatch(searchStart());
           // dispatch(fetchRepos({searchValue}));
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