class KakikosController < ApplicationController
  #before_action :set_kakiko, only: [:show, :update, :destroy]
  #before_action :authenticate_user!でツイッターにログインしているかどうかを確認する
  before_action :authenticate_user!

  # GET /kakikos
  def index
    follower_user_ids = Relation.where(follow:current_user.id).pluck(:follower)
    following_user_ids = Relation.where(follower:current_user.id).pluck(:follow)
    sougo_user_ids = following_user_ids & follower_user_ids
    # sougo_users = User.where(id: sougo_user_ids)
    sougo_user_ids.push(current_user.id)#とりあえず自分自身も参照できるようにしてるだけ
    @kakikos = Kakiko.where(user_id: sougo_user_ids)
    #current_userにはUserクラスが含まれており、その中のメソッドを参照できる
    #jbuiderで整合したデータをrenderで送る、これ一連の流れ
    render 'index', formats: 'json', handlers: 'jbuilder'
  end

  # GET /kakikos/1
#  def show
#    render json: @kakiko
#  end

  # POST /kakikos
  def create
    @kakiko = Kakiko.new(kakiko_params)#属性を設定してモデルオブジェクトを生成
    @kakiko.user_id = current_user.id#user_id属性を追加
    @kakiko.tag = params[:kakiko][:tag]
    @kakiko.name = params[:kakiko][:name]
    if @kakiko.save#saveしないといくら追加したところで意味がない
      #renderでlocalhost:3000に返す　
      render json: @kakiko, status: :created, location: @kakiko
    else
      render json: @kakiko.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /kakikos/1
  #def update
  #  if @kakiko.update(kakiko_params)
  #    render json: @kakiko
  #  else
  #    render json: @kakiko.errors, status: :unprocessable_entity
  #  end
  #end

  # DELETE /kakikos/1
  #def destroy
  #  @kakiko.destroy
  #end

#  private
    # Use callbacks to share common setup or constraints between actions.
#    def set_kakiko
#      @kakiko = Kakiko.find(params[:id])
#    end

    # Only allow a trusted parameter "white list" through.
    #ここでフロントえんどから送られてくるデータを管理
    def kakiko_params
      #  .permitでパラメータを必要な指定
      #  paramsは送られてきた値を受け取るためのメソッドです。
      params.require(:kakiko).permit(:body)
        #  {
        #    kakiko: {
        #      body: 'あああ'
        #    }
        #  }
    end
end
