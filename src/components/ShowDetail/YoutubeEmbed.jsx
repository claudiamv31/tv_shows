import React from 'react';
import { useEffect, useState } from 'react';
import { API_HEADERS, API_URL } from '../../config';
import classes from './YoutubeEmbeded.module.css';

const YoutubeEmbed = ({ id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await fetch(
          `${API_URL}tv/${id}/videos`,
          { headers: API_HEADERS }
        );

        if (!response.ok) {
          throw new Error('Something went wrong while fetching the video.');
        }

        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchShowDetail();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>Error: {httpError}</p>;
  }

  const trailers =
    data && data.results
      ? data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube')
      : [];

  const firstTrailer = trailers.length > 0 ? trailers[0].key : null;

  // TMDB data is external input. Only accept YouTube's 11-character video ID
  // before interpolating it into an iframe URL.
  if (!firstTrailer || !/^[A-Za-z0-9_-]{11}$/.test(firstTrailer)) {
    return <p>No trailer available.</p>;
  }

  return (
    <div className={classes.video}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${firstTrailer}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video of Tv Show"
      />
    </div>
  );
};

export default YoutubeEmbed;
