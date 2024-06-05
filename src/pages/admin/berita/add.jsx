import { useRouter } from "next/router";
import { FormBeritaAdd } from "../../../component/form/FormBeritaAdd";
import { withAuth } from "../../../lib/authorizationAdmin";

const AddBerita=()=> {
  return (
    <>
      <FormBeritaAdd gap={8} />
    </>
  );
}
export default withAuth(AddBerita);