import { FormCalonKetuaEdit } from "../../../../component/form/FormCalonKetuaEdit";
import { withAuth } from "../../../../lib/authorizationAdmin";

const EditCalonKetuaID = () => {
  return (
    <>
      <FormCalonKetuaEdit gap={8} />
    </>
  );
};

export default withAuth(EditCalonKetuaID);
