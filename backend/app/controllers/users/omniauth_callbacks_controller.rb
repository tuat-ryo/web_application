module Users
    class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
        include ActionController::Cookies
        include Devise::Controllers::Rememberable

        def authenticate_user
            true
        end

        #ツイッタ認証をするとまずここに飛ぶ
        def omniauth_success
            get_resource_from_auth_hash
            create_token_info
            set_token_on_resource
            create_auth_params
            sign_in(:user, @resource, store: false, bypass: false)
            #ここまででログイン周りの設定

            if @resource.save!
                yield @resource if block_given?
                current_user.following_users.each do |following_user|
                    @relation = Relation.new(follower: current_user.id, follow: following_user.id)
                    @relation.save
                end

                current_user.follower_users.each do |follower_user|
                    @relation = Relation.new(follower: current_user.id, follow: follower_user.id)
                    @relation.save
                end

                update_auth_header
                cookies['access-token'] = response.headers['access-token']
                cookies['client'] = response.headers['client']
                cookies['uid'] = response.headers['uid']
                redirect_to "http://localhost:3000/"#{ここを取得したドメインに帰る}
                # render json: update_auth_header, status: :ok
            else
                render json: { message: "failed to login" }, status: 500
            end
        end

        protected
        def get_resource_from_auth_hash
            # find or create user by provider and provider uid
            @resource = resource_class.where({
                uid:      auth_hash['uid'],
                provider: auth_hash['provider']
            }).first_or_initialize

            if @resource.new_record?
                @oauth_registration = true
            end

            # sync user info with provider, update/generate auth token
            assign_provider_attrs(@resource, auth_hash)

            # assign any additional (whitelisted) attributes
            extra_params = whitelisted_params
            @resource.assign_attributes(extra_params) if extra_params
            @resource.image = auth_hash[:info][:image]
            @resource.name =auth_hash[:info][:name]
            @resource.nickname  = auth_hash[:info][:nickname]
            @resource.twitter_token = auth_hash.credentials.token
            @resource.twitter_secret = auth_hash.credentials.secret
        end
    end
end
