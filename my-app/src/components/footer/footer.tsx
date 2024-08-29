import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addSelectValue } from "../../store/app-slice";
import { fetchRepos } from "../../store/repository-slice";



export const Footer: React.FC = () => {

   

    const [selectValue, setSelectValue] = useState('10');
    const dispatch = useAppDispatch();
    
    const searchValue = useAppSelector(state => state.app.searchValue);
    const sortValue = useAppSelector(state => state.app.sortValue);

const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    dispatch(addSelectValue(selectValue));
    dispatch(fetchRepos({searchValue, sortValue, selectValue}))
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
    <button>next</button>
</div>
        </div>
    )
}