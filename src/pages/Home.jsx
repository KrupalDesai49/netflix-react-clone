import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <div className='scroll-smooth'>
      <Main />
      {/* <Row rowID='3' title='Trending' fetchURL={requests.requestTrending} /> */}
      {/* <Row rowID='5' title='Now Playing' fetchURL={requests.requestNowPlaying} /> */}
      <Row rowID='2' title='Popular' size='1' fetchURL={requests.requestPopular} />
      <Row  rowID='8' title='Action'  size='0' fetchURL={requests.requestAction} />
      <Row  rowID='7' title='Animation'  size='0' fetchURL={requests.requestAnimation} />
      <Row rowID='1' title='Upcoming'  size='1' fetchURL={requests.requestUpcoming} />
      <Row  rowID='4' title='Top Rated'  size='0' fetchURL={requests.requestTopRated} />
      <Row  rowID='6' title='Comedy' size='0'  fetchURL={requests.requestComedy} />
      <Row  rowID='9' title='Science Fiction'  size='1' fetchURL={requests.requestScienceFiction} />
      <Row  rowID='9' title='Romance'  size='0' fetchURL={requests.requestRomance} />
    </div>
  )
}

export default Home
