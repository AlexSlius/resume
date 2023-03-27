import { CCol, CRow } from "@coreui/react";
import dynamic from 'next/dynamic';
import React from "react";
import uuid from "react-uuid";

import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { ButtonSteps } from "../../../components/buttonSteps"

import { isLoader } from "../../../helpers/loadings"
import { fetchGetListObjective, fetchGetListObjectiveById } from "../../../controllers/dependencies";
import { postUpdateCategoryViewedStatus } from '../../../controllers/addSections';
import {
    fetchUpdateServer,
    fetchDeleteAll,
    fetchAddServer
} from "../../../controllers/careers";
import {
    updateCareer,
    addCareer
} from "../../../slices/careers";

const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
    ssr: false
})

const FormSocials = ({
    dispatch,
    states,
    idCv,
}) => {
    const refIdTimeout = React.useRef(undefined);
    const [update, setUpdate] = React.useState(null);

    const {
        dependencies: {
            objective
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
        careers: {
            data,
            isData
        },
        contacts: {
            contactObj
        },
    } = states;

    const isDataPage = data?.length > 0;

    const handleServerRequestObjective = (value) => {
        dispatch(fetchGetListObjective(value));
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

    React.useEffect(() => {
        dispatch(postUpdateCategoryViewedStatus({ idCv, category: 'careerObjective' }));
        if (!!contactObj?.jobTitleId) {
            dispatch(fetchGetListObjectiveById(contactObj.jobTitleId));
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
                            handleServeDispatchContent={(textContent) => handleUpdateText(textContent)}
                        />
                    </div>
                </CCol>
                <CCol xs={6}>
                    <div className="wr-col-text-r">
                        <FormSearchContent
                            valueText={data}
                            data={objective.list}
                            isLoad={isLoader(objective.status)}
                            handleServerRequest={handleServerRequestObjective}
                            handleUpdateText={handleAddText}
                            setUpdate={setUpdate}
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