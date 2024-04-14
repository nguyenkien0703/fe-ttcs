// import { useAuthLogin } from '@/stores/auth/hook'
// import { Layout } from 'antd'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import AccountInfo from '@/components/account-info'
// const HeaderUser = () => {
//     const { authState } = useAuthLogin()
//     const [mounted, setMounted] = useState(false)
//
//     useEffect(() => {
//         setMounted(true)
//     }, [])
//
//     return (
//         <Layout.Header className="bg-primary fixed z-10 h-12 w-full px-4 py-0 text-white">
//             <div className="flex h-full items-center justify-between">
//                 <Link href="/">
//                     <img
//                         src="https://fptshop.com.vn/uploads/originals//fpt-shop-tuyen-nhieu-vi-tri-lam-viec-tai-cac-shop-ha-noi-id27942.png"
//                         alt="image_errors"
//                         style={{ width: '180px',height: '50px' }}
//                     />
//                 </Link>
//                 <div className="flex gap-7">
//                     {mounted && authState.isAuthenticated && (
//                         <AccountInfo
//                             name="Stan Lee"
//                             avatar="/images/default-avatar.png"
//                         />
//                     )}
//                 </div>
//             </div>
//         </Layout.Header>
//     )
// }
//
// export default HeaderUser
