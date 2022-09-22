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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const LandingList = (): ReactElement<any, any> | null => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

      <Main>

        <Header
          title="Posts"
          button={
            <Button variant="contained" size="small">
              <AddIcon />
              New Post
            </Button>
          }
        />

        <Card sx={{ minWidth: 275, p: 0 }}>
          <CardContent sx={{ p: 0 }}>
            <Filters/>
            <List/>
          </CardContent>
        </Card>

      </Main>
    </QueryClientProvider>
  )
}

export default LandingList
