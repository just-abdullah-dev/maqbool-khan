
export default function getRandomImages(inputArray) {
    // Collect unique countries and their images
    let countryImages = {};

    inputArray.forEach(item => {
        if (!countryImages[item.countryName]) {
            countryImages[item.countryName] = [];
        }
        countryImages[item.countryName] = countryImages[item.countryName].concat(item.images);
    });

    // Collect unique images from different countries
    let selectedImages = [];
    let countries = Object.keys(countryImages);

    while (selectedImages.length < 8 && countries.length > 0) {
        // Select a random country
        let randomCountryIndex = Math.floor(Math.random() * countries.length);
        let country = countries[randomCountryIndex];
        let images = countryImages[country];

        if (images.length > 0) {
            // Select a random image from the selected country
            let randomImageIndex = Math.floor(Math.random() * images.length);
            let image = images.splice(randomImageIndex, 1)[0]; // Remove the selected image from the array

            // Add the selected image to the result
            selectedImages.push({
                path: `/${image}`,
                slug: country.toLowerCase().replace(/\s/g, '-'),
                countryName: country
            });

            // Remove the country from the list if no more images are available
            if (images.length === 0) {
                countries.splice(randomCountryIndex, 1);
            }
        } else {
            // Remove the country if it has no more images
            countries.splice(randomCountryIndex, 1);
        }
    }

    return selectedImages;
}