import { useEffect } from "react";
import { Footer } from "../components/footer/footer";
import { Sidebar } from "../components/sidebar/sidebar";
import { Table } from "../components/table/table";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchRepos } from "../store/repository-slice";



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
        <div className="main">
            {loading && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
           <Table />
            <Sidebar />
            <Footer/>
        </div>
    
        ) : (<div>Добро пожаловать!</div>)
}




   