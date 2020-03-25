import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import * as mmb from 'music-metadata-browser';
import styles from './App.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import { notification, Spin } from "antd";
import 'antd/dist/antd.css';

export function App() {
  const [parseResults, setResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  /* Core Function that handles uploaded folder */
  const onMusicUpload = async (event) => {
    setLoading(true)
    const { files } = event.target;

    for (const file of files) {
      const parseResult = {
        file: file
      };

      setResults(results => {
        results.push(parseResult);
        return results;
      });

      try {
        const metadata = await parseFile(file);
        setResults(results => {
          results[results.length - 1].metadata = metadata;
          return results;
        });

      } catch (err) {
        setResults(results => {
          results[results.length - 1].error = err.message;
          return results;
        });
      }
    }
    groupSongsAndRemoveDuplicates();
  };

  const parseFile = async (file) => mmb.parseBlob(file, { native: true }).then(metadata => metadata);

  const groupSongsAndRemoveDuplicates = () => {
    parseResults.forEach(song => {
      const { metadata: { common: { album, artists, artist } } } = song;
      const artistName = artists.length > 1 ? artists.join(', ') : artist;
      if (album) {
        setAlbums(albums => {
          albums.push(album);
          return Array.from(new Set(albums));
        })
      }
    })
    setResults(results => Array.from(new Set(results)));
    setLoading(false);
    notification.success({
      message: "Songs have been successfully grouped!",
      duration: 2
    })
  };

  return (
    <div className={styles.app}>
      <div className={styles.headliner}>SONG PARSER</div>
      <div>
        <label className={styles.uploadBlock}>
          <UploadOutlined />Upload music
          <input
            className={styles.input}
            onChange={onMusicUpload}
            type="file"
            webkitdirectory=''
            mozdirectory=''
            multiple
          />
        </label>
      </div>
      {/* TODO: It could be a lot better to encapsulate this code into another component */}
      <div className={styles.albums}>
        {loading && <Spin />}
        {!loading && albums.map(album => (
          <div className={styles.album}>
            <div className={styles.album_cover}>
              <div className={styles.album_cover_artist}>
                {parseResults.find(item => item.metadata.common.album === album)
                  .metadata
                  .common
                  .artist}
              </div>
              <div className={styles.album_cover_albumName}>{album}</div>
            </div>
            <div>
              {parseResults
                .filter(song => song.metadata.common.album === album)
                .sort((a, b) => a.metadata.common.track.no - b.metadata.common.track.no)
                .map(song => {
                  const { file: { name }, metadata: {common: { track, title } }} = song;
                  return (
                    <div className={styles.album_track}>
                      {track.no}. {title}
                      <div className={styles.album_track_name}>{name}</div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>(c) Semyon Khoprov</div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optimizing performance via serviceWorker
serviceWorker.register();
