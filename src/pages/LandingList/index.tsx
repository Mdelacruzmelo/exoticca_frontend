import * as React from 'react'
import Button from '@mui/material/Button'
import { ReactElement } from 'react'
import Main from 'Layout/Main'
import Header from 'components/Header'
import Filters from './components/Filters'
import List from './components/List'

const LandingList = (): ReactElement<any, any> | null => {
  return (
    <Main>

      <Header
        title="Landings List"
        button={
          <Button variant="contained">
            New Landing
          </Button>
        }
      />

      <Filters/>

      <List/>

    </Main>
  )
}

export default LandingList
