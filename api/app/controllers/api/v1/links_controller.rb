class Api::V1::LinksController < ApplicationController
  before_action :set_link, only: [:update, :destroy]

  def index
    @links = Link.all.order(created_at: :desc)
    render json: @links
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      render json: @link, status: :created
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  def update
    if @link.update(link_params)
      render json: @link
    else
      render json: @link.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @link.destroy
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :description)
  end

  def set_link
    @link = Link.find(params[:id])
  end
end