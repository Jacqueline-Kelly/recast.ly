import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback) => {
  // TODO: write a jquery get request to the hackreact api https://app-hrsei-api.herokuapp.com/api/recastly/videos
  $.ajax({
    url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos/',
    // type: 'GET',
    data: {
      key: YOUTUBE_API_KEY,
      q: query,
      maxResults: 5,
      videoEmbeddable: true,
      order: 'rating',
      safeSearch: 'strict'
    },
    // contentType: 'x',
    success: (data) => callback(data.slice(0, 5)),
    error: (error, statusCode) => console.log(error, JSON.stringify(statusCode)),
  });
};

export default searchYouTube;

