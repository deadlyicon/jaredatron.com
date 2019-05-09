instead just add a new date column to journal_entries


// exports.up = async function(knex) {

//   await knex.raw(
//     `
//       ALTER TABLE journal_entries
//       ALTER COLUMN created_at
//       TYPE timestamp with time zone;

//       ALTER TABLE journal_entries
//       ALTER COLUMN updated_at
//       TYPE timestamp with time zone;

//       ALTER TABLE trackings
//       ALTER COLUMN created_at
//       TYPE timestamp with time zone;

//       ALTER TABLE trackings
//       ALTER COLUMN updated_at
//       TYPE timestamp with time zone;

//       ALTER TABLE versions
//       ALTER COLUMN created_at
//       TYPE timestamp with time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN last_viewed_at
//       TYPE timestamp with time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN created_at
//       TYPE timestamp with time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN updated_at
//       TYPE timestamp with time zone;
//     `
//   )
// }

// exports.down = async function(knex) {
//   await knex.raw(
//     `
//       ALTER TABLE journal_entries
//       ALTER COLUMN created_at
//       TYPE timestamp without time zone;

//       ALTER TABLE journal_entries
//       ALTER COLUMN updated_at
//       TYPE timestamp without time zone;

//       ALTER TABLE trackings
//       ALTER COLUMN created_at
//       TYPE timestamp without time zone;

//       ALTER TABLE trackings
//       ALTER COLUMN updated_at
//       TYPE timestamp without time zone;

//       ALTER TABLE versions
//       ALTER COLUMN created_at
//       TYPE timestamp without time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN last_viewed_at
//       TYPE timestamp without time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN created_at
//       TYPE timestamp without time zone;

//       ALTER TABLE wiki_pages
//       ALTER COLUMN updated_at
//       TYPE timestamp without time zone;
//     `
//   )
// }
