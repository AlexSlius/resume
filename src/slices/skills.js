import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetSkillslistWork,
  fetchGetSkillslistSearch,
  fetchGetSkillslistAll,
  fetchGetExperienceLevel,
  fetchDeleteAll,
  getSkillsPositionStartOne,
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
    updateItemSkillsFiledLevel(state, action) {
      let { index, value } = action.payload;
      state.skillsObj.skillsListAll[index].level = value;
    },
    updatePosition(state, action) {
      state.skillsObj.skillsListAll = action.payload;
    },
    cleanSlise(state, action) {
      state.skillsObj = initialState.skillsObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.skills ? action.payload.resumeData.data.skills : action.payload.skills.skillsObj.skillsListAll;

      return {
        ...state,
        skillsObj: {
          ...state.skillsObj,
          skillsListAll: objData
        }
      }
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.skillsObj = initialState.skillsObj;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
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
    // get starts skils
    [getSkillsPositionStartOne.pending]: (state) => {
      state.statusIsListSkills = statusLoader;
    },
    [getSkillsPositionStartOne.fulfilled]: (state, action) => {
      state.statusIsListSkills = statusLoaded;
      state.skillsObj.skillsList = action.payload;
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
  updateItemSkillsFiledLevel,
} = slice.actions;

export const { reducer } = slice;
