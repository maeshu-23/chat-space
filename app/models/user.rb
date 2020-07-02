class User < ApplicationRecord
  validates :name, presence: true, uniqueness: {case_sensitive: true}
#〜省略〜
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
