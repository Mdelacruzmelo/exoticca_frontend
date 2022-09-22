import * as React from 'react'
import Button from '@mui/material/Button'
import { ReactElement } from 'react'
import Main from 'Layout/Main'
import Header from 'components/Header'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Filters from './components/Filters'
import List from './components/List'
import AddIcon from '@mui/icons-material/Add'

const LandingList = (): ReactElement<any, any> | null => {
  return (
    <Main>

      <Header
        title="Landings List"
        button={
          <Button variant="contained" size="small">
            <AddIcon />
            New Landing
          </Button>
        }
      />

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Filters/>
          <List/>
        </CardContent>
      </Card>

    </Main>
  )
}

export default LandingList
