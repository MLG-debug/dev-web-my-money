import { Route, Routes } from 'react-router-dom'
import { Transactions } from './pages/Transactions'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Graphics } from './pages/Graphics'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Transactions />} />
        <Route path="/graphics" element={<Graphics />} />
      </Route>
    </Routes>
  )
}
