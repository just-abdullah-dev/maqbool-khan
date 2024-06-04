import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ScatteredImages = ({images}) => {

      function getRandomNumber() {
        return Math.floor(Math.random() * 6);
      }
      
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-24">
          {images.map((item, i) => {
            const index = getRandomNumber();
            return (
              <Link
              className=" relative"
              href={"/publications"}
              key={i}>
              <Image
                width={500}
                height={500}
                src={item?.img}
                alt={`Travel ${index + 1}`}
                className={`w-full h-auto object-cov bg-mountain-meadow-500 p-1 rounded-xl`}
                style={{
                  position: "relative",
                  left: `${(index % 3) * 20}px`,
                  top: `${(index % 3) * 15}px`,
                  zIndex: -index,
                  transform: `rotate(${(index % 6) * 10 - 20}deg)`,
                }}
              />
              <h1
              style={{
                position: "absolute",
                left: `${(index % 3) * 30}px`,
                top: `${(index % 3) * 15}px`,
                zIndex: -index,
                transform: `rotate(${(index % 6) * 10 - 20}deg)`,
              }}
              className=" text-xl font-semibold px-2 py-1 bg-gray-600 bg-opacity-30 w-fit"
              >
                Country
              </h1>
              </Link>
            );
          })}
        </div>
  );
};

export default ScatteredImages;
