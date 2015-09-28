class Form
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String

  belongs_to :user, index: true

  validates :name, presence: true
end
