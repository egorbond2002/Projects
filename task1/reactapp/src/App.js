import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Loading from './components/UI/Loading/Loading.jsx';
import ModalWindow from './components/ModalWindow/ModalWindow.jsx'
import List from './components/UI/List/List.jsx'
import './components/ModalWindow/ModalWindow.css'
import HttpProxyAgent from 'http-proxy-agent';

function App() {
  const [appState, setAppState] = useState({
    loading: false,
    anecdotes: [],
  });
  const [activeAnecdote, setActiveAnecdote] = useState(null);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (!Object.keys(content).length) {
      setActiveAnecdote(null);
    }
  }, [content]);

 useEffect(() => {
  setAppState((appState) => {
    return { ...appState, loading: true };
  });

  setTimeout(()=>{
    const apiUrl = 'http://10.7.8.164:4000/api/anekdotes';

    getContent(apiUrl)
    .then((resp) => {
      const allAnecdotes = resp.data;

      setAppState({
        loading: false,
        anecdotes: allAnecdotes
      });
    });
  },1000)   
}, []);

useEffect(() => {
  console.log(appState.anecdotes)
}, [appState.anecdotes]);

useEffect(() => {
  if (activeAnecdote !== null) {
    const apiUrl = `http://10.7.8.164:4000/api/anekdotes/${ activeAnecdote }`;

    getContent(apiUrl)
    .then((resp) => {
      const allAnecdotes = resp.data; 

      setContent(allAnecdotes);
    });
  }
}, [activeAnecdote]);

  useEffect(() => {
    console.log(content);
  }, [content]);
  
  return (
    <>
      {appState.loading && <Loading/> }
      <List setActiveAnecdote={setActiveAnecdote} appState={appState}/>
      <ModalWindow content={content} setContent ={setContent}/>
    </>
  );
}
function getContent(apiUrl) {
  return axios.get(apiUrl,{
    method: 'GET',
    headers: {
      'User-Agent': 'PostmanRuntime/7.29.2',
      'Connection': 'keep-alive',
    },
    agent: new HttpProxyAgent('http://proxy.compassplus.ru:3128')
  })

}
export default App;