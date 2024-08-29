import { useAppSelector } from "../../hook";

export const Sidebar: React.FC = () => {

    const isMouseEnter = useAppSelector(state => state.app.isMouseEnter);

    const repositories = useAppSelector(state => state.repositories.repositories);
    const repositoryId = useAppSelector(state => state.app.currentRepositoryId);
 
    const repository = repositories.find(rep => rep.id === Number(repositoryId));

    return isMouseEnter ? (
    <div>
       {repository?.name && <div>{repository?.name}</div>}
       {repository?.language && <div>{repository?.language}</div>}
        {repository?.description && <div>{repository?.description}</div>}
        {repository?.license && <div>{repository?.license.name}</div>}
        <div>{repository?.stargazers_count}</div>
    </div>

    ) : (<div>Выберете репозиторий</div>)
}