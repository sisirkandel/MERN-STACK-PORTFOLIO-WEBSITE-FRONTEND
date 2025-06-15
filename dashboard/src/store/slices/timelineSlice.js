import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      // Clear timeline when refetching, or keep previous? Choose as you want:
      // state.timeline = [];
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetTimelineSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      // Keep timeline data intact on reset — or clear it if needed:
      // state.timeline = [];
    },

    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  getAllTimelineRequest,
  getAllTimelineSuccess,
  getAllTimelineFailed,
  addNewTimelineRequest,
  addNewTimelineSuccess,
  addNewTimelineFailed,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  deleteTimelineFailed,
  resetTimelineSlice,
  clearAllErrors,
} = timelineSlice.actions;

export const getAllTimeline = () => async (dispatch) => {
  dispatch(getAllTimelineRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(getAllTimelineSuccess(response.data.timelines));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(
      getAllTimelineFailed(
        error.response?.data?.message || "Failed to load timelines"
      )
    );
  }
};

export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(addNewTimelineRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/timeline/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Add timeline API response:", response.data.message);

    dispatch(addNewTimelineSuccess(response.data.message));
  } catch (error) {
    dispatch(
      addNewTimelineFailed(
        error.response?.data?.message || "Failed to add timeline"
      )
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(deleteTimelineRequest());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteTimelineSuccess(response.data.message));

    setTimeout(() => {
      dispatch(getAllTimeline());
    }, 2000); // 2000 ms = 2 seconds delay

  } catch (error) {
    dispatch(
      deleteTimelineFailed(
        error.response?.data?.message || "Failed to delete timeline"
      )
    );
  }
};


export const resetTimeline = () => (dispatch) => {
  dispatch(resetTimelineSlice());
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default timelineSlice.reducer;
