class CreateTrackings < ActiveRecord::Migration
  def change
    create_table :trackings do |t|
      t.string :type
      t.text :data

      t.timestamps
    end
    add_index :trackings, :type
  end
end
