class Child < ApplicationRecord
  has_secure_password
  belongs_to :parent

  before_create :set_uuid
  def set_uuid
    self.uuid = SecureRandom.uuid
  end
end
