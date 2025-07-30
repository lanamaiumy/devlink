class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.includes(:links).order(:name)

    render json: @categories.as_json(include: { links: { except: [:category_id] } })
  end
end