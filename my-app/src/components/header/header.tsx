import { useState, ChangeEvent, MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../hook";
import { addSearchValue } from "../../store/repository-slice";
import { fetchRepos, setCurrentPage } from "../../store/repository-slice";
import { AppBar, Button, Container, TextField, Toolbar } from "@mui/material";



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
        <AppBar sx={{backgroundColor: '#009999'}} position="static">
            <Toolbar>
            <Container sx={{padding: '20px'}}>
            <TextField className="input" sx={{backgroundColor: 'white', width: '80%'}}  label="Введите поисковый запрос" id="outlined-basic" variant="standard" value={searchValue} onChange={onChangeHandler}/>
            <Button sx={{ flexGrow: 1, marginLeft: '2rem' }} size="large" color="inherit" type="button" onClick={onClickHandler}>Искать</Button>
            </Container>
            </Toolbar>
        </AppBar>
    )
}