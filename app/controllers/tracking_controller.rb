class TrackingController < ApplicationController

  before_filter :require_authentication!
  before_filter :get_type_and_class, except: [:index]

  def index
  end

  def new
  end

  def create
    @record.data = params["tracking_#{@type}"]
    render :new unless @record.save
  end

  private

  def get_type_and_class
    @type = params[:type]
    @klass = "Tracking::#{@type.classify}".constantize
    @record = @klass.new
  rescue
    raise ActionController::RoutingError.new('Not Found')
  end

end
