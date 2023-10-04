

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGVkOTlhNWYxMjE4ZGY1MWZlYzFjODcwMWQxNjM5NSIsInN1YiI6IjY1MTY5ZDg5OTNiZDY5MDBjNGRlNGI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIlpC910B9AW9HHNuwoHazcDpFI3GRIP8G_sBITwkN0",
  },
};

// function to get
const getActorsData = (count, pagesCount) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let promises = [];

    for (let i = 0; i < pagesCount; i++) {
      const promise = fetch(
        `https://api.themoviedb.org/3/trending/person/day?language=en-US&page=${i + 1}`,
        options
      ).then((response) => response.json())
      .then((data) => {
        console.log(data)
        data.results.forEach((singleData) => {
          if (singleData && singleData.profile_path) {
            result.push({
              img: `https://image.tmdb.org/t/p/w500${singleData.profile_path}`,
              name: singleData.name,
              id: singleData.id
            });
          }
        });
        console.log(result)
      })
      .catch((err) => console.error(err));

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        console.log({ count });
        resolve(result.slice(0, count));
      })
      .catch((error) => {
        console.error(error);
        resolve([]);
      });
  });
};

export { getActorsData };