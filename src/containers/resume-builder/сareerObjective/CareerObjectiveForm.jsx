import { CCol, CRow } from "@coreui/react";
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from "react";
import uuid from "react-uuid";

import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { ButtonSteps } from "../../../components/buttonSteps"

import {
    fetchGetListObjectiveById,
    getJopsTitle
} from "../../../controllers/dependencies";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import {
    fetchUpdateServer,
    fetchDeleteAll,
    fetchAddServer
} from "../../../controllers/careers";
import {
    updateCareer,
    addCareer,
    updateFieldSearchJobTitle
} from "../../../slices/careers";
import { jobTitleFromEmployment } from "../../../helpers/jopTitleFormEmployment";


const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
    ssr: false
})

const FormSocials = ({
    dispatch,
    states,
    idCv,
}) => {
    const refIdTimeout = useRef(undefined);
    const [update, setUpdate] = useState(null);
    const [isClean, setIsClean] = useState(false);

    const {
        dependencies: {
            objective,
            jopsTitle
        },
        employment: {
            employmentObj
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
        careers: {
            data,
            searchJobTitle,
            isData
        },
        contacts: {
            contactObj
        },
    } = states;

    const isDataPage = data?.length > 0;

    const handleServerRequestObjective = (value) => {
        dispatch(getJopsTitle(value));
    }

    const handleAddText = (text) => {
        dispatch(addCareer(`<p>${text}</p></br>`));

        setUpdate(uuid());
    }

    const handleUpdateText = (text) => {
        dispatch(updateCareer(text));
        handleUpdateServer();
    }

    const handleClean = () => {
        dispatch(fetchDeleteAll({ idCv }));
        setIsClean(true);
    }

    const handleUpdateServer = async (index) => {
        if (refIdTimeout.current) {
            clearTimeout(refIdTimeout.current);
        }

        refIdTimeout.current = setTimeout(async () => {
            if (isData) {
                await dispatch((fetchUpdateServer({ idCv })));
            } else {
                await dispatch((fetchAddServer({ idCv })));
            }
            clearTimeout(refIdTimeout.current);
        }, 1000);
    }

    const handlesUp = (value, data) => {
        dispatch(updateFieldSearchJobTitle(value));
        if (data) dispatch(fetchGetListObjectiveById(data.id));
    }

    useEffect(() => {
        dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'careerObjective' }));

        if (objective.list?.length === 0) {
            if (!!(+contactObj?.jobTitleId > 0)) {
                dispatch(fetchGetListObjectiveById(contactObj.jobTitleId));
                dispatch(updateFieldSearchJobTitle(''))
            }

            if (!(+contactObj?.jobTitleId > 0)) {
                let jobTitleFormEmployment = jobTitleFromEmployment(employmentObj);

                if (!!jobTitleFormEmployment?.idJobTitle) {
                    dispatch(fetchGetListObjectiveById(jobTitleFormEmployment?.idJobTitle));
                    dispatch(updateFieldSearchJobTitle(''))
                }
            }
        }
    }, []);

    return (
        <>
            <CRow className="mobile-rows career-form">
                <CCol xs={6}>
                    <div className="wr-edit-text">
                        <TextEditor
                            isAddModal={false}
                            devValue={data}
                            updatenIsNew={update}
                            isClean={isClean}
                            setIsClean={setIsClean}
                            handleServeDispatchContent={(textContent) => handleUpdateText(textContent)}
                        />
                    </div>
                </CCol>
                <CCol xs={6}>
                    <div className="wr-col-text-r">
                        <FormSearchContent
                            valueText={data}
                            data={objective.list}
                            handleServerRequest={handleServerRequestObjective}
                            handleUpdateText={handleAddText}
                            listVariant={jopsTitle.list}
                            setUpdate={setUpdate}
                            isExternalDate={true}
                            externalValue={searchJobTitle}
                            externalCollback={handlesUp}
                        />
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol className="mt-4">
                    <ButtonSteps
                        isAthorized={isAthorized}
                        disabledNext={!isDataPage}
                        onClean={handleClean}
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default FormSocials;