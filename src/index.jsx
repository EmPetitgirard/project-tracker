import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import Home from './pages/Home'
import Layout from './components/Layout'
import TicketForm from './pages/TicketForm'
import CategoryForm from './pages/CategoryForm'
import Userfront from '@userfront/toolkit/react'
import ConfirmDialog from './components/ConfirmDialog'

Userfront.init('zn5p5xvb')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ticket/new" element={<TicketForm />} />
            <Route path="/ticket/:ticketId" element={<TicketForm />} />
            <Route path="/category/new" element={<CategoryForm />} />
            <Route path="/category/:categoryId" element={<CategoryForm />} />
          </Routes>
        </Layout>
        <ConfirmDialog />
      </Router>
    </Provider>
  </React.StrictMode>,
)
