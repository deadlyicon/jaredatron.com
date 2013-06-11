class Tracking::Cbt < Tracking

  def self.in_range(range)
    { :in => [nil, "", *range.map(&:to_s)] }
  end

  key :depression_level, :inclusion => in_range(0..10)

  key :doing_right_now

  key :woke_up_today_at

  key :fell_asleep_last_night

  key :intoxication_level, :inclusion => in_range(0..5)

end
