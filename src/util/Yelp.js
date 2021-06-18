const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer d6AvQB2846x0X0XAMq_1A1XHSaI4pWYURARB3-LoVYyJbkEtKP-posONFYp843k_jxaCBmesiqpIZCVO2122NuB-2OVs0oQZ24Dcrj6imWXgx2P7eepZLEp7VmHLYHYx");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const Yelp = {
  search(term, location, sortBy) {
    return fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=pizza&location=paris&sort_by=best_match", requestOptions).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
