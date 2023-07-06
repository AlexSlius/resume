import { isObject } from "lodash";

export const newObjContact = (contactObj, dataImage = null, isUpdate = false) => {
    let obj = {
        job_title: contactObj?.jobTitle || '',
        date_of_birth: contactObj?.dateOfBirth || '',
        driver_license: contactObj.driverLicense || '',
        zip_code: contactObj.zipCode || '',
        city: contactObj.city || '',
        phone: contactObj.phone || '',
        place_of_birth: contactObj.placeOfBirth || '',
        last_name: contactObj.lastName,
        address: contactObj?.address || '',
        country: contactObj.country || '',
        first_name: contactObj.firstName || '',
        nationality: contactObj.nationality || '',
        email: contactObj.email,
        job_title_id: contactObj.jobTitleId
    }

    if (!!dataImage) {
        if (isUpdate)
            if (isObject(dataImage))
                obj.picture = dataImage || null;

        if (!isUpdate)
            obj.picture = dataImage;
    }

    return obj;
}