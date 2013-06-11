class Tracking < ActiveRecord::Base

  serialize :data, Hash

end
