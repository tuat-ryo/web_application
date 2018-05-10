json.array! @kakikos do |kakiko|
  #json.(kakiko, :body,:user_id)
  #Kakikosクラスのリストからkakiko kurasuを一つずつ取っていく
  json.body kakiko.body
  json.user_id kakiko.user_id
  json.tag kakiko.tag
  json.image User.find(kakiko.user_id).image
  json.nickname User.find(kakiko.user_id).nickname
end
