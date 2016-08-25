import {sequelize, Sequelize} from '../sequelize'

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

export default WikiPage
