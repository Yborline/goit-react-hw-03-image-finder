const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24252951-ddd51d265365deb12d4398809";
const imagesPerPage = 12;

async function fetchImages(query, page) {
  try {
    const unparsedImages = await fetch(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${imagesPerPage}`
    );

    if (!unparsedImages.ok) {
      return Promise.reject(
        new Error(`No results were found for your search "${query}"`)
      );
    }

    const images = await unparsedImages.json();
    return images;
  } catch (error) {
    throw error;
  }
}

const api = {
  fetchImages,
};

export default api;

//  componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imgName;
//       const nextName = this.props.imgName;

//     const { numberImage, page } = this.state;

//     if (prevName !== nextName) {
//       const KEY = "24295658-d33a4cb7a7ba959c48fb9a807";

//       this.setState({ status: "pending" });
//       fetch(
//         `https://pixabay.com/api/?key=${KEY}&q=${nextName}&page=${page}&image_type=photo&per_page=${numberImage}`
//       )
//         .then((response) => {
//           if (!response.ok) {
//             return Promise.reject(
//               new Error(`Нет картинки с именем ${nextName}`)
//             );
//           }

//           return response.json();
//         })
//           .then((newImages) =>{
//               if (prevName !== nextName) {
//                    this.setState({
//             images: [...newImages.hits],
//             status: "resolved",
//           })

//             }
//           this.setState({
//             images: [...this.state.images, ...newImages.hits],
//             status: "resolved",
//           })}
//         ).catch = (error) => {
//         this.setState({ error: error.message, status: "rejected" });
//         if (this.page !== 1) this.scrollToBottom();
//       };
//     }
//   }
