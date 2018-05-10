class CreateRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :relations do |t|
      t.integer :follower
      t.integer :follow
      t.timestamps
    end
  end
end
