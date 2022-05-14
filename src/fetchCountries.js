// export function fetchCountries(name){
//     return fetch("https://restcountries.com/v2/all?fields=name,capital,population,flags,lang").then
//     (response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }).catch(error => console.log('error', error));
// }

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  }
  );
}