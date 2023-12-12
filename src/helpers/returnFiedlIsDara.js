let field = [
    'first_name',
    'last_name',
    'Email',
    'phone',
    'country',
    'city',
    'zip_code',
    'state',
    // 'applying_company_name',
    // 'applying_company_job_title',
    // 'applying_company_title',
    // 'applying_company_contact'
];

export const returnIsDataField = (obj) => {
    let returnObj = {};

    Object.keys(obj).forEach(item => {
        let d = obj[item];

        if (field.includes(item)) {
            if (d !== null && d !== undefined && d?.length) {
                returnObj[item] = d
            }
        } else {
            returnObj[item] = d
        }
    })

    return returnObj
}