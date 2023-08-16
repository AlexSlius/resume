import { tabsDashboardPage } from "./dashboardsTabs"

import contactIcon from "/public/images/icons/contact.svg?sprite"
import employmentIcon from '/public/images/icons/employment.svg?sprite'
import educationIcon from '/public/images/icons/education.svg?sprite'
import skillsIcon from '/public/images/icons/skills.svg?sprite'
import socialIcon from '/public/images/icons/social.svg?sprite'
import hobbiesIcon from '/public/images/icons/hobies.svg?sprite'
import activityIcon from '/public/images/icons/activities.svg?sprite'
import coursesIcon from '/public/images/icons/courses.svg?sprite'
import internshipIcon from '/public/images/icons/intership.svg?sprite'
import languagesIcon from '/public/images/icons/languages.svg?sprite'
import referencesIcon from '/public/images/icons/references.svg?sprite'
import certificationsIcon from '/public/images/icons/certifications.svg?sprite'
import advancedIcon from '/public/images/icons/icon_settings_aside.svg?sprite'
import сareerObjectiveIcon from '/public/images/icons/сareerObjective.svg?sprite'
import downloadIcon from '/public/images/icons/icon-donw.svg?sprite'

export const keysIcons = {
    iconContact: "iconContact",
    iconEmploymen: "iconEmploymen",
    iconEducation: "iconEducation",
    iconSkills: "iconSkills",
    iconSocial: "iconSocial",
    iconHobbies: "iconHobbies",
    iconActivity: "iconActivity",
    iconCourses: "iconCourses",
    iconInternship: "iconInternship",
    iconLanguages: "iconLanguages",
    iconReferences: "iconReferences",
    iconCertifications: "iconCertifications",
    iconAdvanced: "iconAdvanced",
    сareerObjective: "сareerObjective",
    iconDownload: "downloadIcon",
}

export const routerLinksAsideMenuIcon = {
    [keysIcons["iconContact"]]: contactIcon,
    [keysIcons["iconEmploymen"]]: employmentIcon,
    [keysIcons["iconEducation"]]: educationIcon,
    [keysIcons["iconSkills"]]: skillsIcon,
    [keysIcons["iconSocial"]]: socialIcon,
    [keysIcons["iconHobbies"]]: hobbiesIcon,
    [keysIcons["iconActivity"]]: activityIcon,
    [keysIcons["iconCourses"]]: coursesIcon,
    [keysIcons["iconInternship"]]: internshipIcon,
    [keysIcons["iconLanguages"]]: languagesIcon,
    [keysIcons["iconReferences"]]: referencesIcon,
    [keysIcons["iconCertifications"]]: certificationsIcon,
    [keysIcons["iconAdvanced"]]: advancedIcon,
    [keysIcons["сareerObjective"]]: сareerObjectiveIcon,
    [keysIcons["iconDownload"]]: downloadIcon
};

export const routersPages = {
    'register': 'register',
    'login': 'login',
    'forgot': 'forgot-password',
    'checEmail': 'check-your-email',
    'newPassword': 'new-password',
    'dashboard': `dashboard?tab=${tabsDashboardPage['resumes'].link}`,
    'settings': 'settings',
    'resumeBuilder': 'resume-builder',
    'resumeBuilderNew': 'resume-builder/new?tab=contact',
    'pageCoverLetter': 'cover-letter',
    'coverLetter': 'cover-letters',
    'coverLetterNew': 'cover-letters/new?tab=contact',
    'addSection': 'add-section',
    'resumeNow': 'resume-now',
    'faqs': 'faqs',
    'contactUs': 'contact-us',
    'jobWinningResumeTemplates': 'job-winning-resume-templates',
    "pageCoverLeterTemplates": "job-winning-cover-templates",
    'termsOfUse': 'terms-of-use',
    'privacyPolicy': 'privacy-policy',
    'templates': 'templates',
    'shareResume': 'share-resume',
    'shareCover': 'share-cover',
}