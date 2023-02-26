import { CvPerfilLayout } from "@/layout/cv/perfil";
import { CvPerfilProps } from "@/layout/cv/perfil/types";
import { curriculumService } from "@/services/api/curriculum";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {

  const { data } = await curriculumService.findAll()
  console.log('asdasdasd')

  const paths = data.map((value) => ({
    params: {
      id: value.id
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CvPerfilProps> = async (context) => {
  const { id } = context?.params || {}

  const { data } = await curriculumService.findById(id as string)

  return {
    props: {
      data
    },
    revalidate: 10
  }
}



export default function CvPerfilPage (props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <CvPerfilLayout {...props} />
  )
}

