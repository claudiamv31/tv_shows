import { useEffect, useState } from 'react';

import { API_KEY, API_URL, IMAGE_URL_RES, PROVIDERS_URL } from '../../config';
import classes from './Streaming.module.css';

const Streaming = ({ id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await fetch(
          `${API_URL}tv/${id}/watch/providers?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            'Something went wrong while fetching the streaming providers.'
          );
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
    return <p>{httpError}</p>;
  }

  if (!data?.results?.US?.flatrate || data.results.US.flatrate.length === 0) {
    return <p>No streaming providers available.</p>;
  }

  const topStreams = data.results.US.flatrate
    .filter(provider => provider.display_priority <= 10)
    .sort((a, b) => b.display_priority - a.display_priority)
    .slice(0, 3)
    .map(provider => {
      const providerUrl = PROVIDERS_URL[provider.provider_name];

      return (
        <li key={provider.provider_id}>
          {providerUrl ? (
            <a
              href={`https://${providerUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMAGE_URL_RES}${provider.logo_path}`}
                alt={provider.provider_name}
              />
            </a>
          ) : (
            <span>
              <img
                src={`${IMAGE_URL_RES}${provider.logo_path}`}
                alt={provider.provider_name}
              />
            </span>
          )}
        </li>
      );
    });

  return (
    <div className={classes.streaming}>
      <h2>Streaming</h2>
      <ul>{topStreams}</ul>
    </div>
  );
};

export default Streaming;
