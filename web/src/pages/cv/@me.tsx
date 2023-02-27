import { Head } from "@/components/common";
import { withAuthorization } from "@/hoc";
import { CvLayout } from "@/layout/cv";

function CVPage () {
  return (
    <>
      <Head 
        title="MyCV | Meu perfil"
        description="Edite e revise as informações do seu cv"
      />
      <CvLayout />
    </>
  )
}

export default withAuthorization(CVPage)