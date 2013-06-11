class Tracking::Cbt < Tracking

  key :depression_level, :inclusion => { :in => [nil, "", *0..10] }

  key :doing_right_now

  key :woke_up_today_at

  key :fell_asleep_last_night

  key :intoxication_level, :inclusion => { :in =>[nil, "", *0..5] }

end
