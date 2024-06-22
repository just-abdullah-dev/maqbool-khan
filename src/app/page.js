import Layout from "@/components/Layout/Layout";
// import Home from "@/components/Pages/Home/Home";
// import Socials from "@/components/Utils/SocialMediaIcons";
// import { getAll } from "@/services/utils";

export default async function Page() {
  // const aboutData = await getAll("maqboolkhan", "personal");
  // const eduData = await getAll("maqboolkhan", "education");
  // const publiData = await getAll("maqboolkhan", "publications");
  // const projectData = await getAll("maqboolkhan", "projects");
  // const expeData = await getAll("maqboolkhan", "experience");
  // const skillsData = await getAll("maqboolkhan", "skills");
  // const countriesData = await getAll("maqboolkhan", "gallery");

  return (
    <Layout>
      <div className=" relative font-san">
        {/* <Socials
          css={
            " flex flex-col fixed top-36 z-50 right-0 text-whit bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50"
          }
          data={aboutData?.data?.socials}
          altNameCss={"right-full group-hover:right-[calc(100%+0.7rem)]"}
        />  */}
        home page
        {/* <Home
          aboutData={aboutData}
          eduData={eduData}
          publiData={publiData}
          projectData={projectData}
          expeData={expeData}
          skillsData={skillsData}
          countriesData={countriesData}
        /> */}
      </div>
    </Layout>
  );
}
