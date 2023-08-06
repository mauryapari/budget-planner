import cookie from "cookie";

import jwt, { Secret } from "jsonwebtoken";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token;

    if (!token) {
      // If the token is missing, redirect to the login page
      return <div>Redirecting to login...</div>;
    }

    try {
      // Verify the JWT token with your secret key
      const secret: Secret = process.env.JWT_SECRET_KEY!;

      const decoded = jwt.verify(token, secret);

      // If the token is valid, render the wrapped component with the decoded user data
      return <WrappedComponent {...props} user={decoded} />;
    } catch (error) {
      // If the token is invalid or expired, redirect to the login page
      return <div>Redirecting to login...</div>;
    }
  };

  return Wrapper;
};

export default withAuth;


// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { token } = cookie.parse(document.cookie);

//     if (!token) {
//       // If the token is missing, redirect to the login page
//       return <div>Redirecting to login...</div>;
//     }

//     try {
//       // Verify the JWT token with your secret key
//       const decoded = jwt.verify(token, 'your_secret_key');

//       // If the token is valid, render the wrapped component with the decoded user data
//       return <WrappedComponent {...props} user={decoded} />;
//     } catch (error) {
//       // If the token is invalid or expired, redirect to the login page
//       return <div>Redirecting to login...</div>;
//     }
//   };
// };

// export default withAuth;
