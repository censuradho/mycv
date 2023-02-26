import { withAuthorization } from "@/hoc";
import { CvLayout } from "@/layout/cv";

function CVPage () {
  return (
    <CvLayout />
  )
}

export default withAuthorization(CVPage)