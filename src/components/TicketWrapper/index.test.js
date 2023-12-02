import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import { render } from '../../utils/test'
import TicketWrapper from './'

const ticketData = {
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
}

it('Should display ticket datas', () => {
  render(<TicketWrapper ticket={ticketData} />)

  expect(screen.getByText('Tick-5')).toBeInTheDocument()
  expect(
    screen.getByTitle(
      "API INPI - Intégrer les modifications de contrôles de l'INPI de S30 au POC",
    ),
  ).toBeInTheDocument()
  expect(screen.getByText('[API INPI IND.] Evolutio ...')).toBeInTheDocument()
})
