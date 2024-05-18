import Layout from "@/components/Layout/Layout";
import Home from "@/components/Pages/Home/Home";
import { getAll } from "@/services/utils";
 
export default async function Page() {
  const aboutData = await getAll("maqboolkhan", "personal");
  const eduData = await getAll("maqboolkhan", "education");
  const publiData = await getAll("maqboolkhan", "publications");
  const projectData = await getAll("maqboolkhan", "projects");
  const expeData = await getAll("maqboolkhan", "experience");

  return <Layout>
    <Home aboutData={aboutData} eduData={eduData} publiData={publiData} projectData={projectData} expeData={expeData} />
  </Layout>
}