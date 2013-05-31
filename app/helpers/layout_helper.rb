module LayoutHelper

  def page_name
    @page_name ||= "#{controller_name}/#{action_name}"
  end

end
