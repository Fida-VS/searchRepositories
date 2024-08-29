import { MouseEvent } from "react";
import { useAppDispatch } from "../../hook";
import { addCurrentRepositoryId, doMouseEnterFalse, doMouseEnterTrue } from "../../store/app-slice";


interface TableRowProps {
    id: number;
    name: string;
    language: string;
    forks_count: string;
    stargazers_count: string;
    updated_at: string;
}


export const TableRow: React.FC<TableRowProps> = ({
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
        <tr data-id={id} onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}>
            <td>{name}</td>
            <td>{language}</td>
            <td>{forks_count}</td>
            <td>{stargazers_count}</td>
            <td>{updated_at.substring(-10, 10)}</td>
        </tr>
    )
}