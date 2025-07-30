class Api::V1::CategoriesController < ApplicationController
  def index
    # v1.0.1 - forçando atualização render
    @categories = Category.includes(:links).order(:name)

    render json: @categories.as_json(include: { links: { except: [:category_id] } })
  end
end