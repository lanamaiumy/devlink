class Category < ApplicationRecord
  has_many :links, dependent: :destroy
end
