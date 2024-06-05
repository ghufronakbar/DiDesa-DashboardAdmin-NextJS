import { FormInformasiDesa } from "../../../component/form/FormInformasiDesa";
import { withAuth } from "../../../lib/authorizationAdmin";

const InformasiDesa = () => {
  return (
    <>
      <FormInformasiDesa gap={8} />      
    </>
  );
};

export default withAuth(InformasiDesa);
