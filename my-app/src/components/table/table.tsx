
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchRepos } from "../../store/repository-slice";
import { MyTableRow } from "./tableRow";





export const MyTable: React.FC = () => {

  const repositories = useAppSelector(state => state.repositories.repositories);

  const searchValue = useAppSelector(state => state.repositories.searchValue);
  const currentPage = useAppSelector(state => state.repositories.currentPage);

  const dispatch = useAppDispatch();

   const onHandleClick = (sortValue: string) => {
    dispatch(fetchRepos({searchValue, sortValue, currentPage}))
   };

    return (
      <Container>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
  <TableRow>
    <TableCell><Typography>Название</Typography></TableCell>
    <TableCell align="right"><Typography>Язык</Typography></TableCell>
    <TableCell align="right"><Typography sx={{cursor: 'pointer'}} onClick={() => onHandleClick('forks')}>Число форков</Typography></TableCell>
    <TableCell align="right"><Typography sx={{cursor: 'pointer'}} onClick={() => onHandleClick('stars')}>Число звёзд</Typography></TableCell>
    <TableCell align="right"><Typography sx={{cursor: 'pointer'}} onClick={() => onHandleClick('updated')}>Дата обновления</Typography></TableCell>
  </TableRow>
  </TableHead>
  <TableBody>
						{repositories.map(
							(repository) => (
								<MyTableRow 
                key={repository.id}
                {...repository}
                
                />
							)
						)}
        
  </TableBody>
  </Table>
  </TableContainer>
        
  </Container>
    )
}

