class AddCategoryToLinks < ActiveRecord::Migration[8.0]
  def change
    add_reference :links, :category, null: false, foreign_key: true
  end
end
