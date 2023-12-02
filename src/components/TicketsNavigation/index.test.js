import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/test'
import TicketsNavigation from './'

const ticketsMockedData = [
  {
    category: {
      color: '#5f92cc',
      title: '[API INPI IND.] Evolutions identifiées pour la prochaine version',
      _id: '6547dc01f3aa41170ae4b593',
    },
    comments: [],
    description:
      'L’INPI a livré des modifications de son API sur S30, ce qui a généré de nouvelles erreurs sur des cas précédemment passants. Il faut identifier ces nouvelles erreurs pur identifier si: une MAJ du prototype est nécessaire ou simplement prendre en compte de nouvelles consignes de saisie (par exemple de de type “toujours saisir le numéro de voie”)',
    requirements:
      "API INPI - Intégrer les modifications de contrôles de l'INPI de S30 au POC",
    title: 'Tick-5',
    _id: '6547dc79f3aa41170ae4b595',
  },
  {
    category: {
      color: '#d28be8',
      title:
        '[API INPI ind.] Adaptations portail pour création des Immatriculations PM via API INPI',
      _id: '6547dbdaf3aa41170ae4b592',
    },
    comments: [],
    description:
      'On a cette erreur :Failed to execute goal on project infg-ft-formalites-imr-services-pdf-cerfa: Could not resolve dependencies for project fr.infogreffe.ft.formalites.imr:infg-ft-formalites-imr-services-pdf-cerfa:jar:4.0.3-SNAPSHOT: Could not find artifact fr.infogreffe.ft.formalites.imr:infg-ft-formalites-imr-services-impl:jar:tests:4.0.3-SNAPSHOT in nexus (https://outils.docapost.tech/nexus/repository/infogreffe)',
    requirements:
      "Formalités Web et DGFIP - erreur au moment du build dans le cas d'une nouvelle version dans le pom",
    title: 'Tick-6',
    _id: '6547dcacf3aa41170ae4b596',
  },
]

const categoriesMockedData = [
  {
    _id: '6547dbdaf3aa41170ae4b592',
    title:
      '[API INPI ind.] Adaptations portail pour création des Immatriculations PM via API INPI',
    color: '#d28be8',
  },
  {
    _id: '6547dc01f3aa41170ae4b593',
    title: '[API INPI IND.] Evolutions identifiées pour la prochaine version',
    color: '#5f92cc',
  },
]

const server = setupServer(
  rest.get('http://localhost:5050/record', (req, res, ctx) => {
    return res(ctx.json(ticketsMockedData))
  }),
  rest.get('http://localhost:5050/category', (req, res, ctx) => {
    return res(ctx.json(categoriesMockedData))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('Should display tickets after loader is removed', async () => {
  render(<TicketsNavigation />)

  await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('New Ticket')).toBeInTheDocument()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})
