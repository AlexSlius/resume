import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as appReducer } from '../slices/app';
import { reducer as activityReducer } from '../slices/activity';
import { reducer as certificatiesReducer } from '../slices/certificaties';
import { reducer as contactReducer } from '../slices/contact';
import { reducer as courseReducer } from '../slices/courses';
import { reducer as educationReducer } from '../slices/education';
import { reducer as employmentReducer } from '../slices/employment';
import { reducer as hobbiesReducer } from '../slices/hobies';
import { reducer as intershipReducer } from '../slices/intersnhips';
import { reducer as languagesReducer } from '../slices/languages';
import { reducer as referencesReducer } from '../slices/reference';
import { reducer as skillsReducer } from '../slices/skills';
import { reducer as socialsReducer } from '../slices/socials';
import { reducer as dependencies } from '../slices/dependencies';
import { reducer as authReducer } from '../slices/auth';
import { reducer as resumesReducer } from '../slices/resumes';
import { reducer as usersReducer } from '../slices/users';
import { reducer as addSectionReducer } from '../slices/addSection';
import { reducer as menuAsideResume } from "../slices/menuAsideResume";

export const combinedReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  dependencies: dependencies,
  activitys: activityReducer,
  certificaties: certificatiesReducer,
  contacts: contactReducer,
  courses: courseReducer,
  educations: educationReducer,
  employment: employmentReducer,
  hobies: hobbiesReducer,
  interships: intershipReducer,
  languages: languagesReducer,
  references: referencesReducer,
  skills: skillsReducer,
  socials: socialsReducer,
  resumers: resumesReducer,
  users: usersReducer,
  addSection: addSectionReducer,
  menuAsideResume
})

