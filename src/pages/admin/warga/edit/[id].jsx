import { FormWargaEdit } from "../../../../component/form/FormWargaEdit";
import { withAuth } from "../../../../lib/authorizationAdmin";

const EditWargaID = () => {
  return (
    <>
      <FormWargaEdit gap={8} />
    </>
  );
};

export default withAuth(EditWargaID);
