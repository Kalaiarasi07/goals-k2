class CreateParents < ActiveRecord::Migration[6.0]
  def change
    create_table :parents, id: false do |t|
      t.string :uuid, primary_key:true, null:false
      t.string :name
      t.string :email
      t.string :password_digest
     
      t.timestamps
    end
  end
end
