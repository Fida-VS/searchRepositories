import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


type Repository = {
    id: number;
    name: string;
    language: string;
    description?: string;
    forks_count: string;
    stargazers_count: string;
    updated_at: string;
    license: License;
}

type License = {
    key?: string | undefined | null;
    name?: string | undefined | null;
    node_id?: string | undefined | null;
    spdx_id?: string | undefined | null;
    url?: string | undefined | null;
}

type fetchReposProps = {
    searchValue: string;
    sortValue?: string;
    selectValue?: string;
}

type RepositoriesState = {
    repositories: Repository[];
    currentPage: number;
    totalCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: RepositoriesState = {
    repositories: [],
    currentPage: 1,
    totalCount: 0,
    loading: false,
    error: null,
}

export const fetchRepos = createAsyncThunk<Repository[], fetchReposProps, {rejectValue: string}>(
    'repositories/fetchRepos',
    async function ({searchValue, sortValue, selectValue}, { rejectWithValue }) {


            const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&sort=${sortValue}&per_page=${selectValue}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/vnd.github+json'
                      },
                      method: 'GET',
                }
            );
            
            if(!response.ok){
              return rejectWithValue('Server Error!');
            }
        
            const data = await response.json();

            console.log(data)

            return data.items;
          
          } 
  
);

const repositorySlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRepos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRepos.fulfilled, (state, action) => {
            state.repositories = action.payload;
            state.loading = false;
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
  });


  
export default repositorySlice.reducer;

function isError (action: AnyAction){
    return action.type.endsWith('rejected');
}