import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetSkillslistWork,
  fetchGetSkillslistSearch,
  fetchGetSkillslistAll,
  fetchGetExperienceLevel
} from "../controllers/skills";

const initialState = {
  skillsObj: {
    id: "",
    selectd_work: "",
    searchSkils: "",
    skillsList: [],
    skillsListAll: [],
    hideExperienceLevel: false,
  },
  status: statusLoaded,
  statusIsListSkills: statusLoaded,
  statusListSkillsAll: statusLoaded,
};

export const slice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    updateItemSkillsFiled(state, action) {
      let { name, value } = action.payload;
      state.skillsObj[name] = value;
    },
    updatePosition(state, action) {
      state.skillsObj.skillsListAll = action.payload;
    },
    cleanSlise(state, action) {
      state.skillsObj = initialState.skillsObj;
    },
  },
  extraReducers: {
    // get experience
    [fetchGetExperienceLevel.pending]: (state, action) => {
      state.statusListSkillsAll = statusLoader;
    },
    [fetchGetExperienceLevel.fulfilled]: (state, action) => {
      state.statusListSkillsAll = statusLoaded;
      state.skillsObj.hideExperienceLevel = action.payload.status;
    },
    // get list skills all
    [fetchGetSkillslistAll.pending]: (state) => {
      state.statusListSkillsAll = statusLoader;
    },
    [fetchGetSkillslistAll.fulfilled]: (state, action) => {
      state.statusListSkillsAll = statusLoaded;
      state.skillsObj.skillsListAll = action.payload;
    },
    // get skills of work
    [fetchGetSkillslistWork.pending]: (state) => {
      state.statusIsListSkills = statusLoader;
    },
    [fetchGetSkillslistWork.fulfilled]: (state, action) => {
      state.statusIsListSkills = statusLoaded;
      state.skillsObj.skillsList = action.payload;
    },
    [fetchGetSkillslistSearch.pending]: (state) => {
      state.statusIsListSkills = statusLoader;
    },
    [fetchGetSkillslistSearch.fulfilled]: (state, action) => {
      state.statusIsListSkills = statusLoaded;
      state.skillsObj.skillsList = action.payload;
    }
  }
});

export const {
  updateItemSkillsFiled,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
