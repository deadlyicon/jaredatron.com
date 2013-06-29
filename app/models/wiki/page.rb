class Wiki::Page < ActiveRecord::Base

  validates :path, :uniqueness => true

  has_paper_trail

  def to_param
    path
  end

  def viewed!
    ActiveRecord::Base.record_timestamps = false
    update_attribute(:last_viewed_at, Time.now)
  ensure
    ActiveRecord::Base.record_timestamps = true
  end

end
