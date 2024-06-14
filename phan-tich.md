# Thiết kế Schema Twitter bằng MongoDB
**Nên đọc trước**
- [Giải ngố P1](https://duthanhduoc.com/blog/p1-giai-ngo-authentication-basic-authentication)
- [Giải ngố P2](https://duthanhduoc.com/blog/p2-giai-ngo-authentication-session)
- [Giải ngố P3](https://duthanhduoc.com/blog/p3-giai-ngo-authentication-jwt)
- [Giải ngố P4](https://duthanhduoc.com/blog/p4-luu-jwt-token-o-localstorage-hay-cookiet)
- [Giải ngố P5](https://duthanhduoc.com/blog/p5-giai-ngo-authentication-OAuth2)


Một só ghi chú nhỏ

- Tên collection nên được đặt theo dạng số nhiều, kiểu snake_case, ví dụ `users`, `refresh_tokens`

- Tên field nên được đặt theo dạng snake_case, ví dụ `email_verify_token`, `forgot_password_token`

- `_id` là trường được MongoDB tự động tạo ra, khồng cần phải thêm trường `_id` vào. Cũng không nên tìm mọi cách đee63 đổi tên `_id` thành `id` hay thay đổi cơ chế của nó. Vì sẽ làm giảm hiệu suất của MongoDB

- Trường `created_at`, `updated_at` nên có kiểu `Date` để dễ dàng sắp xếp, tìm kiếm, lọc theo thời gian

- Trường `created_at` nên luôn được thêm vào khi tạo mới document

- Trường `updated_at` thì optional

- Tất cả trường đại diện id của document thì nên có kiểu `ObjectId`

- Tìm hiểu về kiểu dữ liệu [đây](https://www.mongodb.com/docs/manual/reference/bson-types/)

## Phân tích chức năng
## Users

- Người dùng đăng ký nhập `name`, `email`, `password` là được. Vậy `name`, `email`, `day_of_birth`, `password` là những trường bất8 buộc phải có bên cạnh `_id` là trường tự động tạo ra bởi MongoDB

- Sau khi đăng ký xong thì sẽ có email đính kèm `email_verify_token` để xác thực email (`duthanhduoc.com/verify-email?email_verify_token=123321123`). Mỗi user chi có 1 `email_verify_token` duy nhất, vì nếu user nhấn re-send email thì sẽ tạo ra `email_verify_token` mới thay thế cái cũ. Vậy nên ta lưu thêm trường `email_verify_token` vào schema `users`. Trường này có kiểu `string`, nếu user xác thực email thì ta sẽ set `''`.

- Tương tự ta có chức năng quên mật khẩu thì sẽ gửi mail về reset mật khẩu, ta cũng dùng `forgot_password_token` để xác thực (`duthanhduoc.com/forgot_password?forgot_password_token=123321123 `). Vậy ta cũng lưu thêm trường `forgot_password_token` vào schema `users`. Trường này có kiểu `string`, nếu user reset mật khẩu thì ta sẽ st `''`.

- Nn6 có một trường là `verify` để biết trạng thái tài khoản của user. Ví dụ chưa xác thực eamil, đã xác thực, bị khóa, lên tích xanh. Vậy giá trị của nó nên là enum

- Ngdung có thể update các thông tin sau vào profile: `bie`, `location`, `website`, `username`, `avatar`, `cover_photo`. Vậy ta cũng lưu các trường này vào schema User với kiểu là `string`. `avatar`, `cover_photo` đơn giản chỉ là string url thôi. Đây là những giá trị optional, tức người dùng không nhập vào thì vẫn dùng bình thường. Nhưng cũng nên lưu st `''` khi người dùng ko nhập gì để tiện quãn lý

- Cuối cùng là trường `created_at`, `updated_at` để biết thời gian tạo và cập nhật usr. Vậy ta lưu thêm 2 trường này vào schema User với kiểu `Date`. 2 trường này luôn có giá trị.


```ts
enum UserVerifyStatus {
    Unverified, // chưa xác thực email, mặc định = 0
    Verify, // đã xác thực email
    Banned // bị khóa
}
interface User {
    _id: ObjectId
    name: string
    email: string
    date_of_birth: Date
    password: string
    create_at: Date
    updated_at: Date
    email_verify_token: string // jwt hoặc '' nếu đã xác thực email
    forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
    verify: UserverifyStatus

    bio: string // optional
    location: string // optional
    website: string // optional
    usernamee: string // optional
    avatar: string // optional
    cover_photo: string // optional
}


```


## refresh_tokens

Hệ thống sẽ dùng JWT để xác thực người dùng. Vậy mỗi lần người dùng đăng nhập thành công thì sẽ tạo ra 1 JWT access token và 1 refresh token

- JWT access token thì không cần lưu vào database, vì chúng ta sẽ cho nó stateless(Không trạng thái không lưu vào trong server gọi là stateless)
- Còn refresh token thì cần lưu vào database để tăng tính bảo mật

Một user thì có thể có nhiều refresh token (không giới hạn), nên không thể lưu hết vào trong collection `users` được => Quan hệ 1 - rất nhiều

Và đôi lúc chúng ta chỉ quan tâm đến refresh token mà không cần biết user ấy là ai. Vậy nên tạo ra một collection riêng để lưu refresh token.
```ts
interface RefreshToken {
    _id: ObjectId
    token: string
    created_at: Date
    user_id: ObjectId
}
```

## followers

Một người dùng có thể follow rất nhiều user khác, nếu dùng 1 mảng `followings` chứa ObjeactId trong collection `users` thì sẽ khộng tối ưu. Vì dễ chạm đến giới hạn 16MB của MongoDB

Chưa hết, nếu dùng mảng `followings` thì muốn tìm kiếm user A đang follow ai rất dễ nhưng ngược lại, tìm kiếm ai đang follow user A thì lại rất khó

Vậy nên ta tạo ra 1 collection riêng để lưu các mqh follow giữa các user là hợp lý hơn cả

1 user có rất nhiều follower, và 1 follower cũng có rất nhiều user khác follow lại => Quan hệ rất nhiều - rất nhiều

```ts
interface followers {
    _id: ObjectId
    user_id: ObjectId
    followed_user_id: ObjectId // Người được người này follow
    created_at: Date
}
```

## tweets

Chúng ta sẽ chọn ra chức năng chính của tweet để clone

1. Tweet có thể chứa text, hashtags, metions, ảnh, video
2. Tweet có thể hiển thị cho everyone hoặc Twitter Circle
3. Tweet có thể quy định reply (everyone, người mà ta follow, ng chúng ta mention)

- Twet sẽ có nested tweet, nghĩa là tweet có thể chứa tweet con bên trong. Nếu dùng theo kiểu nested object sẽ không phù hợp, vì sớm thôi nó sẽ chạm đến giới hạn. Chưa kể query thông tin 1 tweet con rất khó

Vậy nên ta sẽ lưu trường `parent_id` để biết tweet này là con của ai. Nếu `parent_id` là `null` thì đó là tweet gốc

- Nếu là tweet bình thường thì sẽ có `content` là string. Còn nếu là retweet thì sẽ ko có `content` mà chỉ có `parent_id`, lúc này có thể cho content là `''` or `null`, như mình phân tích ở những bài trước thì mình thích để `''` hơn, đỡ phải phân tích trường hợp `null`. Vậy nên `content` có thể là `string`

> Nếu là '' thì sẽ chiếm bộ nhớ hơn là null, nhưng điều này không đáng kể so với lợi ích nó đem lại

- `audience` đại diện cho tính riêng tư của tweet. Ví dụ tweet có thể là public cho mng xem or chỉ cho nhóm người nhất định. Vậy nên `visibility` có thể là `TweetAudience` enum

- `type` đại diện cho loại tweet. Ví dụ tweet, retweet, quote tweet

- `hashtag` là mảng chứa ObjectId của các hashtag. Vì mỗi tweet có thể có nhiều

- `medias` là mảng chứa ObjectId của các media. Vì mỗi tweet chỉ có thể có 1 vài media. Nêu upload ảnh thì sẽ không upload được video và ngược lại. Vậy nên `medias` có thể là `Media[]`

- Bên twitter sẽ có rất là nhiều chỉ số để phân tích lượt tiếp cận của 1 tweet. Trong giới hạn của khóa học thì chúng ta chỉ phân tích lượt view thôi

    Lượt view thì chúng ta chia ra làm 2 loại là `guest_views` là số lượng lượt xm của tweet từ người dùng không đăng nhập và `user_views` là dành cho đã đăng nhập. 2 trường này mình sẽ cho kiểu dữ liệu là `number`

```ts 
interface Tweet {
    _id: ObjectId
    user_id: ObjectId
    type: TweetType
    audience: TweetAudience
    content: string
    parent_id: null | ObjectId
    hashtags: ObjectId[]
    mentions: ObjectId[]
    medias: Media[]
    guest_views: number
    user_views: number
    created_at: Date
    updated_at: Date
}
```
```ts
interface Media {
    url: string
    type: MediaType // video, image
}
enum MediaType {
    Image, 
    Video
}
enum TweetAudienc {
    Everyone, 
    TwitterCircle
}
enum TweetType {
    Tweet, 
    Retweet,
    Comment,
    QuoteTweet
}
```

## bookmarks

Bookmark các tweet lại, mỗi user không giới hạn số lượng bookmark. Sở dĩ ko cần `updated_at` là vì trong trường hợp người dùng unbookmark thì chúng ta sẽ xóa document này đi.

```ts
interface Bookmarks {
    _id: ObjectId
    user_id: ObjectId // Người lưu
    tweet_id: ObjectId // Bài viết
    create_at: Date
}
```


## hashtags

- Hỗ trợ tìm kiếm theo hashtag
- Mỗi tweet có thể có ít hashtag.
- Mỗi hashtag có rất nhiều tweet.

!!! Không nên làm như này 

```ts
interface Tweet {
    _id: ObjectId
    user_id: ObjectId
    type: TweetType
    audience: TweetAudience
    content: string
    parent_id: null | ObjectId // chỉ null khi tweet gốc
  X hashtags: [] // Không nên nhúng như thế này, vì sẽ gây khó khăn trong việc tìm kiếm những tweet nào có hashtag này, cũng như là gây lặp lại dữ liệu về tên hashtag
    mentions: ObjectId[]
    medias: Media[]
    guest_views: number
    user_views: number
    created_at: Date
    updated_at: Date
}
```

=> Quan hệ ít - rất nhiều

- Lưu 1 array ObjectId `hashtags` trong collection `tweets`

- Tạo ra 1 collection riêng để lưu `hashtags` và không lưu mảng `tweet_id` vào trong collection `hashtags`. Vì nếu lưu `tweet_id` vào trong collection `hashtags` thì sẽ dễ chạm đến giới hạn 16MB. Và cũng không cần thiết để lưu, vì khi search các tweet liên quan đến hashtag thì chúng ta sẽ dùng id hashtag để tìm kiếm trong collection `tweets`.

```ts 
interface Hashtag {
    _id: ObjectId
    name: string
    created_at: Date
}
```