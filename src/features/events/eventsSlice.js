import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventsService from './eventsService';

const initialState = {
  events: [],
  isLoading: false,
  event: {},
};

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async formData => {
    try {
      return await eventsService.createEvent(formData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const editEvent = createAsyncThunk('events/editEvent', async obj => {
  try {
    return await eventsService.editEvent(obj);
  } catch (error) {
    console.error(error);
  }
});

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async eventId => {
    try {
      console.log(eventId);
      return await eventsService.deleteEvent(eventId);
    } catch (error) {
      console.error(error);
    }
  }
);
export const getAll = createAsyncThunk('events/getAll', async () => {
  try {
    return await eventsService.getAll();
  } catch (error) {
    console.error(error);
  }
});
export const searchEvents = createAsyncThunk(
  'events/search',
  async ({ title, categories }) => {
    try {
      return await eventsService.search(title, categories);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getById = createAsyncThunk('events/getById', async _id => {
  try {
    return await eventsService.getById(_id);
  } catch (error) {
    console.error(error);
  }
});
export const like = createAsyncThunk('events/like', async _id => {
  try {
    return await eventsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});
export const dislike = createAsyncThunk('events/dislike', async _id => {
  try {
    return await eventsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.events = action.payload;
        state.isLoading = false;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.isLoading = false;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.event = action.payload;
        state.isLoading = false;
      })
      .addCase(getById.pending, state => {
        state.isLoading = true;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.event = {
          ...action.payload,
        };
      })
      .addCase(dislike.fulfilled, (state, action) => {
        state.event = {
          ...action.payload,
        };
      });
  },
});

export default eventsSlice.reducer;
