class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :email,                  type: String, default: ""
  field :encrypted_password,     type: String, default: ""
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time
  field :remember_created_at,    type: Time
  field :confirmation_token,     type: String
  field :confirmed_at,           type: DateTime
  field :confirmation_sent_at,   type: DateTime

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :confirmable
end

