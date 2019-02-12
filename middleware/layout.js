import Cookies from 'js-cookie'

export default function ({ store, redirect ,req, app}) {
  // If the user is not authenticated
  // console.log(req.headers.cookie)
  // let userInfo = Cookies.get('userInfo')
  const token = app.$cookies.get('access_token')
  if (!token) {
    redirect('/login')
    return
  }
}