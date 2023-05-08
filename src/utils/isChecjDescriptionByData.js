const DATA_NAMES = [
    "graduateDate",
    "expectedYearOfGraduation",
    "nameCollegeOrUniversity",
    "pointAverage",
    "fieldOfStudyOrDegree",
    "professionalSkills",
    "skillSet",
    "wordDescribes",
    "othersDescribe",
    "industryHoldExperienceJobTitle",
    "industryHoldExperienceCompanyName",
    "workExperience",
    "workExperienceYears",
    "currentRoleJobTitle",
    "currentRoleCompanyName",
    "recentRoleJobTitle",
    "recentRoleCompanyName",
    "explainAnyWorkGaps",
    "applyingCompanyName",
    "applyingCompanyJobTitle",
    "applyingCompanyTitle",
    "applyingCompanyContact",
]

export const isCheckDescriptionByDataCover = (data) => {
    for (let i = 0; i < DATA_NAMES.length; i++) {
        if (!!data[DATA_NAMES[i]]?.length > 0) {
            return true;
        }
    }

    return false;
}