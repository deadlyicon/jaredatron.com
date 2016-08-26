import {sequelize, Sequelize} from '../sequelize'

const JournalEntry = sequelize.define('journal_entries',
  {
    body: {
      type: Sequelize.TEXT,
      field: 'body'
    },
  }
);

export default JournalEntry
