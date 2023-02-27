import { CvPerfilLayout } from "@/layout/cv/perfil";
import { CvPerfilProps } from "@/layout/cv/perfil/types";
import { curriculumService } from "@/services/api/curriculum";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {

  const { data } = await curriculumService.findAll()

  const paths = data.map((value) => ({
    params: {
      slug: value.slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CvPerfilProps> = async (context) => {
  const { slug } = context?.params || {}

  const { data } = await curriculumService.findBySlug(slug as string)

  return {
    props: {
      data
    },
    revalidate: 10
  }
}



export default function CvPerfilPage (props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(props)
  return (
    <CvPerfilLayout {...props} />
  )
}
