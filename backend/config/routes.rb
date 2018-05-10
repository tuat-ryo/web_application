Rails.application.routes.draw do
  # resourceを使ったrestfulなルーティング
  # 上から順に処理を行う、resourcesでkakikosコントローラの全ての関数を実行
  resources :kakikos

  ## localhost:3000/user/auth に認証API
  mount_devise_token_auth_for 'User', at: 'auth', controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
