import { CvPerfilLayout } from "@/layout/cv/perfil";
import { curriculumService } from "@/services/api/curriculum";
import { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await curriculumService.findAll()

  const paths = data.map((value) => ({
    params: {
      id: value.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async () => {

}



export default function CvPerfilPage () {
  return (
    <CvPerfilLayout />
  )
}

