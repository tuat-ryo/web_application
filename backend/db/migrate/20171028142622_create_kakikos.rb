class CreateKakikos < ActiveRecord::Migration[5.1]
  def change
    create_table :kakikos do |t|
      t.text :body
      t.text :tag
      t.text :name
      # 外部キーはuser_id
      #t.referencesとすると:のあとの文字列に＿idをつけた値を属性とする、かつ変な値を入れないようにする
      t.references :user, foreign_key: true
      t.timestamps null: false
    end
  end
end
