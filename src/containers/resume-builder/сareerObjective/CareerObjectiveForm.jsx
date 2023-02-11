import { CCol, CRow } from "@coreui/react";
import dynamic from 'next/dynamic';
import React from "react";

import { TextEditorProvider } from '../../../components/uis/TextEditor/context';
import { FormSearchContent } from "../../../components/uis/formSearchContent/formSearchContent";
import { ButtonSteps } from "../../../components/buttonSteps"

import { isLoader } from "../../../helpers/loadings"

import { fetchGetListObjective } from "../../../controllers/dependencies";

const TextEditor = dynamic(() => import('../../../components/uis/TextEditor/TextEditor'), {
    ssr: false
})

const FormSocials = ({
    dispatch,
    states,
    idCv,
}) => {
    const refIdTimeout = React.useRef(undefined);

    const {
        dependencies: {
            objective
        },
        auth: {
            autorizate: {
                isAthorized
            }
        },
    } = states;

    const handleServerRequestObjective = (value) => {
        dispatch(fetchGetListObjective(value));
    }

    return (
        <>
            <CRow>
                <CCol xs={6}>
                    <div className="wr-edit-text">
                        <TextEditorProvider>
                            <TextEditor
                                // isLoad={isLoader(employers.status)}
                                // data={employers.list}
                                isAddModal={false}
                            // devValue={item.assignment}
                            // handleServerRequest={handleServerRequest}
                            // handleServeDispatchContent={(textContent) => handleServeDispatchContent(index, textContent)}
                            />
                        </TextEditorProvider>
                    </div>
                </CCol>
                <CCol xs={6}>
                    <div className="wr-col-text-r">
                        <FormSearchContent
                            data={objective.list}
                            isLoad={isLoader(objective.status)}
                            handleServerRequest={handleServerRequestObjective}
                        />
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol className="mt-4">
                    <ButtonSteps
                        isAthorized={isAthorized}
                    // disabledNext={!isDataPage}
                    // onClean
                    />
                </CCol>
            </CRow>
        </>
    )
}

export default FormSocials;