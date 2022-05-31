class Parent < ApplicationRecord
  has_secure_password
  has_many :children

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  before_create :set_uuid
  def set_uuid
    self.uuid = SecureRandom.uuid
  end

end
