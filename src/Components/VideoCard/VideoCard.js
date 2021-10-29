import './VideoCard_module.css'
import '../../styles.css'
import { Link } from 'react-router-dom'
import { useUser } from '../../Context/user/userContext'

import { historyAdd } from '../../Services/user.service'

export default function VideoCard({ video }) {
  const {
    userState: { isLoggedIn },
    userDispatch,
  } = useUser()
  const { _id, embedId, title, views, channel, age, thumbnailImgUrl } = video
  const addHistory = async (video) => {
    if (isLoggedIn === null) return
    else {
      let promise = historyAdd(video)
      userDispatch({ type: 'ADD_TO_HISTORY', payload: video })
      let response = await promise
      if (!response.success) {
        console.error('not added to history')
      }
    }
  }
  return (
    <Link
      to={'/video/' + embedId}
      key={_id}
      className='card'
      onClick={() => addHistory(video)}
    >
      <div>
        <img src={thumbnailImgUrl} alt='' />
      </div>
      <div className='card-content'>
        <div className='logo'>
          <img src={channel.logo} alt='' />
        </div>
        <div className='content'>
          <div className='pad1'>{title}</div>
          <div className='pad1 silver'>{channel.title}</div>
          <div className=' silver'>
            <span style={{ marginLeft: '5px' }}>{views % 1000}k views •</span>
            <span> {age} ago</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
