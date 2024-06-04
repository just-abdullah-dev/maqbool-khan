// pages/fonts.js

import { Italiana, Cinzel } from 'next/font/google';


const italiana = Italiana({
    subsets: ['latin'], // Specify the character subsets you need (optional)
    weight: ['400'], // Default weight is 400, adjust if needed
  });

  
const cinzel = Cinzel({
    subsets: ['latin'], // Specify the character subsets you need (optional)
    weight: ['400'], // Default weight is 400, adjust if needed
  });

export { italiana, cinzel };
