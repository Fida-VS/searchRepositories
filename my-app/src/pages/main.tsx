import { useEffect } from "react";
import { Footer } from "../components/footer/footer";
import { Sidebar } from "../components/sidebar/sidebar";
import { MyTable } from "../components/table/table";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchRepos } from "../store/repository-slice";
import { Container, Typography } from "@mui/material";



export const Main: React.FC = () => {

    const {loading, error} = useAppSelector(state => state.repositories);

    const repositories = useAppSelector(state => state.repositories.repositories);
    const searchValue = useAppSelector(state => state.repositories.searchValue);
    const sortValue = useAppSelector(state => state.repositories.sortValue);
    const currentPage = useAppSelector(state => state.repositories.currentPage);

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchRepos({searchValue, sortValue, currentPage}));
        
    }, [dispatch, searchValue, sortValue, currentPage])

    return (repositories.length > 0 && repositories !== null) ? (
        <Container sx={{paddingTop: '3%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexBasis: '90%'}} className="main">
        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
            {loading && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
           <MyTable />
            <Sidebar />
        </Container>
         <Footer/>
         </Container>
        ) : (<Container sx={{paddingTop: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sx={{color: '	#C0C0C0'}} variant="h3">Добро пожаловать</Typography></Container>)
}




   