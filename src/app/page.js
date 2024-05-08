import Layout from "@/components/Layout/Layout";
import Home from "@/components/Pages/Home/Home";
import { getAll } from "@/services/utils";

async function getData() {
  const data = await getAll("maqboolkhan", "personal")
  return data;
}
 
export default async function Page() {
  const aboutData = await getData();
 
  return <Layout>
    <Home aboutData={aboutData} />
  </Layout>
}