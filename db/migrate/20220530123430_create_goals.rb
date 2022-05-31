class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals, id: false do |t|
      t.string :uuid, primary_key:true, null:false
      t.string :goal_name
      t.string :goal
      t.string :goal_category
      t.integer :points
      t.bigint :due_date
      t.string :p_uuid
      t.string :c_uuid
      t.boolean :completed

      t.timestamps
    end
  end
end

