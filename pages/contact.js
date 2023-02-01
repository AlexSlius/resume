import { ContactPage as ContainerPageContact } from "../src/containers/contactPage"
import { withRedirectPublickPage } from "../src/middleware/redirectPublick";

const ContactPage = () => {
    return (
        <ContainerPageContact />
    )
}

// export const getServerSideProps = withRedirectPublickPage();

export default ContactPage;
