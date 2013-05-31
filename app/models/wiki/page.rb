class Wiki::Page < ActiveRecord::Base

  has_paper_trail

  def to_param
    path
  end

  def viewed!
    update_attribute(:last_viewed_at, Time.now)
  end

end
