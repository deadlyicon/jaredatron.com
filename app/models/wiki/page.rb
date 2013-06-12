class Wiki::Page < ActiveRecord::Base

  validates :path, :uniqueness => true

  has_paper_trail

  def to_param
    path
  end

  def viewed!
    update_attribute(:last_viewed_at, Time.now)
  end

end
