class User < ActiveRecord::Base
    #ActiveRecord::Baseとするとモデルができる機能を全てできるようになる
    # Include default devise modules.
    devise :rememberable, :omniauthable
    include DeviseTokenAuth::Concerns::User

    def client
        oauth_config = YAML.load_file("#{Rails.root}/config/omniauth.yml")[Rails.env].symbolize_keys!
        require 'twitter'
        client = Twitter::REST::Client.new do |config|
            config.consumer_key = oauth_config[:twitter]['key']
            config.consumer_secret = oauth_config[:twitter]['secret']
            config.oauth_token = self.twitter_token
            config.oauth_token_secret = self.twitter_secret
        end
    end

    # current_user.friends現在ログインしているユーザのid
    def following_users
        client = self.client
        if client
            friend_ids = client.friend_ids(self.nickname).to_a #ユーザがフォローしてる人
            friend_users = User.where(uid: friend_ids) #rubyでは最後に代入したものが返される仕様
        else
            []
        end
    end

    def follower_users
        client = self.client
        if client
            friend_ids = client.follower_ids(self.nickname).to_a #ユーザのフォロワー
            friend_users = User.where(uid: friend_ids) #rubyでは最後に代入したものが返される仕様
        else
            []
        end
    end
end
