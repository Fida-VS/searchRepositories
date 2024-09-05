import { Container, Pagination, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hook";
import {  setCurrentPage } from "../../store/repository-slice";
import { useState } from "react";



export const Footer: React.FC = () => {

    const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(setCurrentPage(page))
  };

    const dispatch = useAppDispatch();
    
    const totalCount = useAppSelector(state => state.repositories.totalCount);
    const pagesCount = Math.ceil(totalCount/10);


    return (
        <Container sx={{paddingTop: '4%'}}>

            <Stack spacing={2}>
                <Pagination count={pagesCount} page={page} onChange={handleChange} />
            </Stack>

        </Container>
    )
}