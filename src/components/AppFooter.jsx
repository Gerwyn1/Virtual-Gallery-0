import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Blak Labs
        </a>
        <span className="ms-1">&copy; 2023 Creative Labs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Blak Labs
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
