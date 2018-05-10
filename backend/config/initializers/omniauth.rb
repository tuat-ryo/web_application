Rails.application.config.middleware.use OmniAuth::Builder do
   OAUTH_CONFIG = YAML.load_file("#{Rails.root}/config/omniauth.yml")[Rails.env].symbolize_keys!
   provider :twitter, OAUTH_CONFIG[:twitter]['key'], OAUTH_CONFIG[:twitter]['secret']
end