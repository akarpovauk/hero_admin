import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
// import { v4 as uuidv4 } from 'uuid';

// const initialState = {
//     filters: [],
// 	filtersLoadingStatus: "idle",
// 	activeFilter: "all"
// }

const filtersAdapter = createEntityAdapter({
	selectId: (filters) => filters.name
	// selectId: (filter) => uuidv4()
});

const initialState = filtersAdapter.getInitialState({
	filtersLoadingStatus: "idle",
	activeFilter: "all"
})

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	async () => {
		const {request} = useHttp();
		return await request("https://json-server-vercel-flax-eight.vercel.app/filters")
	}
);

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter=action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, state => {
				state.filtersLoadingStatus = 'loading';
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = 'idle';
				filtersAdapter.setAll(state, action.payload);
			})
			.addCase(fetchFilters.rejected, state => {
				state.filtersLoadingStatus = 'error';
			})
			.addDefaultCase(() => {})
	}
})

const {actions, reducer} = filtersSlice;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);
export default reducer;
export const {
	filtersFetching,
	filtersFetched,
	filtersFetchingError,
	activeFilterChanged
} = actions;