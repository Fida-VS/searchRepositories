
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchRepos } from "../../store/repository-slice";
import { TableRow } from "./tableRow";




export const Table: React.FC = () => {

  const repositories = useAppSelector(state => state.repositories.repositories);

  const searchValue = useAppSelector(state => state.app.searchValue);
  const selectValue = useAppSelector(state => state.app.selectValue);
    const currentPage = useAppSelector(state => state.repositories.currentPage);

  const dispatch = useAppDispatch();

   const onHandleClick = (sortValue: string) => {
    dispatch(fetchRepos({searchValue, selectValue, sortValue, currentPage}))
   };

    return (
      <div>
        <table>
              <thead>
  <tr>
    <th><button type="button">Название</button></th>
    <th><button type="button">Язык</button></th>
    <th><button type="button" onClick={() => onHandleClick('forks')}>Число форков</button></th>
    <th><button type="button" onClick={() => onHandleClick('stars')}>Число звёзд</button></th>
    <th><button type="button" onClick={() => onHandleClick('updated')}>Дата обновления</button></th>
  </tr>
  </thead>
  <tbody>
						{repositories.map(
							(repository) => (
								<TableRow 
                key={repository.id}
                {...repository}
                
                />
							)
						)}
        
  </tbody>
  </table>
        
  </div>
    )
}

