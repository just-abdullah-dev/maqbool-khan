import { usePathname } from "next/navigation";

// Custom hook to check if a link is active
const useIsActiveLink = (link) => {
  const pathname = usePathname();
  const currentLinkSlug = pathname.split("/").pop();
  return currentLinkSlug === link;
};

export default useIsActiveLink;
