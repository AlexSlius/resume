import ContainerPageTemplates from "../../../src/containers/templates"
import TemplatesWrapper from "../../../src/wrappers/templates"
import { withPublicRoute } from "../../../src/middleware/publicRouter"

const TemplatesPage = ({ store }) => {
    const { resumeData, contacts } = store.getState();

    return (
        <TemplatesWrapper>
            <ContainerPageTemplates beforeСontent={resumeData.resumeData?.contact ? resumeData.resumeData.data.contact?.[0].isDummyTextHidden : contacts.contactObjNew?.isDummyTextHidden} />
        </TemplatesWrapper>
    )
}

export const getServerSideProps = withPublicRoute({
    isGetResumesTemplates: true,
    isGetResumeDataAll: true,
});

export default TemplatesPage;
