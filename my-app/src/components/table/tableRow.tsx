import { MouseEvent } from "react";
import { useAppDispatch } from "../../hook";
import { addCurrentRepositoryId, doMouseEnterFalse, doMouseEnterTrue } from "../../store/app-slice";
import { TableCell, TableRow } from "@mui/material";


interface TableRowProps {
    id: number;
    name: string;
    language: string;
    forks_count: string;
    stargazers_count: string;
    updated_at: string;
}


export const MyTableRow: React.FC<TableRowProps> = ({
    id,
    name,
    language,
    forks_count,
    stargazers_count,
    updated_at
}) => {

    const dispatch = useAppDispatch();

    const handleMouseEnter = (event: MouseEvent<HTMLTableRowElement>) => {
        dispatch(doMouseEnterTrue());
       
        const targetRow = (event.target as HTMLElement).closest<HTMLTableRowElement>("tr");
        const repositoryId = targetRow?.getAttribute('data-id');

        dispatch(addCurrentRepositoryId(repositoryId));
      };
    
      const handleMouseLeave = () => {
        dispatch(doMouseEnterFalse());
      };

    return (
        <TableRow data-id={id} onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{language}</TableCell>
            <TableCell align="right">{forks_count}</TableCell>
            <TableCell align="right">{stargazers_count}</TableCell>
            <TableCell align="right">{updated_at.substring(-10, 10)}</TableCell>
        </TableRow>
    )
}