import { Container, Typography } from "@mui/material";
import { useAppSelector } from "../../hook";

export const Sidebar: React.FC = () => {

    const isMouseEnter = useAppSelector(state => state.app.isMouseEnter);

    const repositories = useAppSelector(state => state.repositories.repositories);
    const repositoryId = useAppSelector(state => state.app.currentRepositoryId);
 
    const repository = repositories.find(rep => rep.id === Number(repositoryId));

    return isMouseEnter ? (
    <Container sx={{display: 'flex', flexDirection: 'column', backgroundColor: '#eee'}}>
       {repository?.name && <Container sx={{margin: '20px 0', display: 'flex', justifyContent: 'center'}}><Typography variant="h5">{repository?.name}</Typography></Container>}

       <Container sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>

            <Typography sx={{fontSize: '1.3em'}}>{repository?.language && <div>{repository?.language}</div>}</Typography>

        <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{color: '#FFC600', fontSize: '1.5em', marginRight: '4px'}}>★</Typography>
            <Typography sx={{fontSize: '1.3em'}}>{repository?.stargazers_count}</Typography>

        </Container>

       </Container>
       
        {repository?.description && <Container sx={{marginBottom: '20px'}}><Typography sx={{fontSize: '1.1em'}}>{repository?.description}</Typography></Container>}
        {repository?.license && <Container sx={{marginBottom: '20px'}}><Typography sx={{fontSize: '1.1em'}}>{repository?.license.name}</Typography></Container>}
    </Container>

    ) : (<Container sx={{backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography>Выберите репозиторий</Typography></Container>)
}