import Link from 'next/link'
import React from 'react';
import useIsActiveLink from "@/hooks/useIsActiveLink";

export default function NavLink({item, handleClick}) {
    const isActiveLink = useIsActiveLink(item?.link);
  return (
    <Link onClick={handleClick} href={`/${item.link}`} className={`${isActiveLink && " text-mountain-meadow-500 dark:text-mountain-meadow-400"} hover:text-mountain-meadow-500 dark:hover:text-mountain-meadow-400 duration-200`}>
              {item.name}
            </Link>
  )
}
