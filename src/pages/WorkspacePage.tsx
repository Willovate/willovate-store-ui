import { useParams } from 'react-router-dom'
import Workspace from '../pages/Workspace'

export default function WorkspacePage() {
  const { websiteId } = useParams<{ websiteId: string }>()

  if (!websiteId) {
    return (
      <div className="workspace-container">
        <div className="workspace-error">
          <p>Website ID not provided</p>
          <a href="/">Back to store</a>
        </div>
      </div>
    )
  }

  return <Workspace websiteId={websiteId} />
}
