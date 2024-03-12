// import activity from './data/mockups/activity.mockup.json'
import AnualActivityGrid from "./components/AnualActivityGrid/AnualActivityGrid.jsx"
import { useState, useCallback, useEffect } from 'react'
import './App.css'

const App = () => {
  const [activity, setActivity] = useState([])
  const [gitHubInfo, setGitHubInfo] = useState({
    'username': 'facebook',
    'repository': 'react',
  })

  const fetchActivity = useCallback(async () => {
    const { username, repository } = gitHubInfo

    try {
      const resp = await fetch(`https://api.github.com/repos/${username}/${repository}/stats/commit_activity`)
      
      const data = await resp.json()
      if(!resp.ok){ throw new Error(`An error has ocurred: ${data.message}`)}
      if(resp.status === 202){ throw new Error(`An error has ocurred: the request has been accepted for processing, but the processing has not been completed. Try again`)}
      
      return data
    } catch (error) {
      console.error(error)
      alert(error)

      return []
    }
  }, [gitHubInfo])

  useEffect(() => {
    fetchActivity(gitHubInfo)
      .then(setActivity)
      .catch(setActivity)
  }, [fetchActivity])

  const handleSubmit = (e) => { 
    e.preventDefault()

    const formInfo = Object.fromEntries(new FormData(e.target));
    const sanitizedFormInfo = Object.keys(formInfo)
                                .reduce((acum, currentKey) => ({
                                    ...acum,
                                    [currentKey]: formInfo[currentKey].trim().toLowerCase()
                                }), {})
    setGitHubInfo(sanitizedFormInfo)
  }  

  return (
    <>
      <form onSubmit={handleSubmit} className="form-github-activity">
        <div className="field-text">
          <label htmlFor="username" className="field-text__label">Username</label>
          <input type="text" placeholder="Enter GitHub username" name="username" id="username" defaultValue={gitHubInfo.username} className="field-text__input"/>
        </div>

        <div className="field-text">
          <label htmlFor="repository" className="field-text__label">Repository name</label>
          <input type="text" placeholder="Enter GitHub repository name" name="repository" id="repository" defaultValue={gitHubInfo.repository} className="field-text__input"/>
        </div>

        <button type="submit" className="form-github-activity__btn-submit">Get activity</button>
      </form>
    
      {
        (activity.length > 0) &&
        <>
          <div className="github-links">
            <a href={`https://github.com/${gitHubInfo.username}`} target="_blank" className="github-links__link">{gitHubInfo.username}</a>| 
            <a href={`https://github.com/${gitHubInfo.username}/${gitHubInfo.repository}`} target="_blank" className="github-links__link">{gitHubInfo.repository}</a>
          </div>
          
          <AnualActivityGrid activity={activity} />
        </>
      }
    </>
  )
}

export default App