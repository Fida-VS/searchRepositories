import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Data = {
    items: Repository[];
    total_count: number;
}

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
    currentPage?: number;
}

type RepositoriesState = {
    repositories: Repository[];
    searchValue: string;
    sortValue: string;
    currentPage: number;
    totalCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: RepositoriesState = {
    repositories: [],
    searchValue: '',
    sortValue: '',
    currentPage: 1,
    totalCount: 0,
    loading: false,
    error: null,
}

export const fetchRepos = createAsyncThunk<Data, fetchReposProps, {rejectValue: string}>(
    'repositories/fetchRepos',
    async function ({searchValue, sortValue, currentPage}, { rejectWithValue }) {


            const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&sort=${sortValue}&per_page=10&page=${currentPage}`,
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

            return data;
          
          } 
  
);

const repositorySlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        addSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload;
          },
          addSortValue(state, action: PayloadAction<string>){
            state.sortValue = action.payload;
          },
        setCurrentPage(state, action: PayloadAction<number>){
        state.currentPage = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRepos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRepos.fulfilled, (state, action) => {
            state.repositories = action.payload.items;
            state.totalCount = action.payload.total_count;
            state.loading = false;
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
  });


  export const { addSearchValue, addSortValue, setCurrentPage } = repositorySlice.actions;
  
export default repositorySlice.reducer;

function isError (action: AnyAction){
    return action.type.endsWith('rejected');
}