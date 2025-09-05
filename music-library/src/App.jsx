import React from 'react'
import { MusicLibrary } from './components/MusicLibrary'
import './index.css';

export default function App(props) {
  return <MusicLibrary {...props} />;
}
