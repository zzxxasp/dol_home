AV.initialize('D6rvDcHFKqPHsxuhn3CSaIzl-gzGzoHsz', 'l4dMbKQEpcNleHu2rL90bmYd');
//获取已经登录用户的信息
var currentUser = AV.User.current();
//如果有用户信息，那么需要显示，并隐藏登录和注册的连接
if (currentUser) {
    console.log(currentUser);
    var avatarPhoto = currentUser.get('headPic');
    var url = avatarPhoto.thumbnailURL(100,100);
    console.log(url);
} else {
    //如果没有则显示登录和注册的连接
}