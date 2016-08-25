import Sequelize from 'sequelize'
import { sequelize } from '../database'

const WikiPage = sequelize.define('wiki_pages',
  {
    path: {
      type: Sequelize.STRING,
      field: 'path'
    },
    markdown: {
      type: Sequelize.TEXT,
      field: 'markdown'
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['path']
      },
    ]
  }
);

sequelize.sync()
  .then(x => {
    console.log('SYNC TRUE')

    // WikiPage.create({
    //   path: '/focus',
    //   markdown: '# Focus\n\nits important'
    // })

  })
  .catch(x => console.log('SYNC FALSE', x))

export default WikiPage
