class TrackingController < ApplicationController

  before_filter :get_type_and_class

  def new
    render "tracking/#{@type}"
  end

  def create
    @record.data = params["tracking_#{@type}"]
    render "tracking/#{@type}" unless @record.save
  end

  private

  def get_type_and_class
    @type = params[:type]
    @klass = "Tracking::#{@type.classify}".constantize
    @record = @klass.new
  end

end
