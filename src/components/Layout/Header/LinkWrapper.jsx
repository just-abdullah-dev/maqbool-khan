'use client';

import Link from 'next/link';
import { useState } from 'react';

const LinkWrapper = ({ children, href, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <Link href={href} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="relative">
        {children}
        {isHovered && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-mountain-meadow-500 duration-500 transition-transform transform origin-bottom-left"></span>}
      </span>
    </Link>
  );
};

export default LinkWrapper;
