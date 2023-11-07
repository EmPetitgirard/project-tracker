import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import Home from './pages/Home'
import Layout from './components/Layout'
import TicketForm from './pages/TicketForm'
import CategoryForm from './pages/CategoryForm'
import { ConfirmAlertProvider } from 'react-use-confirm-alert'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConfirmAlertProvider>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ticket/new" element={<TicketForm />} />
              <Route path="/ticket/:ticketId" element={<TicketForm />} />
              <Route path="/category/new" element={<CategoryForm />} />
              <Route path="/category/:categoryId" element={<CategoryForm />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </ConfirmAlertProvider>
  </React.StrictMode>,
)
