// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        router.push('/login');
      } else {
        // Verify token is valid
        fetch('http://127.0.0.1:8000/api/home/', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('access_token');
            router.push('/login');
          }
        })
        .catch(() => {
          localStorage.removeItem('access_token');
          router.push('/login');
        });
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

// Then use it in your home.js
// export default withAuth(Home);