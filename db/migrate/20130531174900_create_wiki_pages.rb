class CreateWikiPages < ActiveRecord::Migration
  def change
    create_table :wiki_pages do |t|
      t.string :path, limit: 256
      t.text :content

      t.datetime "last_viewed_at"
      t.timestamps
    end
    add_index :wiki_pages, :path, unique: true
  end
end
