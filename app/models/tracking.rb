class Tracking < ActiveRecord::Base

  serialize :data, Hash

  def self.keys
    keys = @keys ||= []
    keys += superclass.keys if superclass.respond_to? :keys
    keys
  end

  def self.key(key, validations=nil)
    @keys ||= []
    @keys << key
    define_method("#{key}"){ data[key] }
    define_method("#{key}="){|value| data[key] = value }
    validates key, validations if validations.present?
  end

end
