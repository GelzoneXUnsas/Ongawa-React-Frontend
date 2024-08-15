import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import {auth} from "./firebase"
import { GoogleAuthProvider } from "firebase/auth";


// import AWS from 'aws-sdk';  // need to npm install (will probably move this code and getUserRole/setUserRole into backend folder so npm install there)


export const doCreateUserWithEmailAndPassword = async (email, password) =>  {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // // to save user information
    // result.user
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    });
};

export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'The credential is invalid or expired. Please try again.';
      case 'auth/user-disabled':
        return 'This user account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No user found with this email. Please check your email or sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/weak-password':
        return 'The password is too weak. Please choose a stronger password.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };


// // the rest of the code below is for setting/editing userRoles as they go from users/mucisians, artists, admin, etc
// // ideally move it to a backend file for dynamoDB endpoints
// // Configure the AWS SDK
// AWS.config.update({
//   region: 'your-region', // e.g., 'us-west-2'
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
// });

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export const setUserRole = async (userId, role) => {
//     const params = {
//         TableName: 'DynamoDB table name', // Replace with your table name
//         Item: {
//             userId: userId,
//             role: role,
//             permissions: {
//                 canEdit: role === 'admin',
//                 canView: role !== 'guest',
//                 // Add more custom permissions as needed
//             }
//         }
//     };

//     try {
//         await dynamoDb.put(params).promise();
//         console.log('User role set:', params.Item);
//     } catch (error) {
//         console.error('Error setting user role in DynamoDB:', error);
//     }
// };

// export const getUserRole = async (userId) => {
//   const params = {
//       TableName: 'YourTableName', // Replace with your table name
//       Key: {
//           userId: userId
//       }
//   };

//   try {
//       const data = await dynamoDb.get(params).promise();
//       if (data.Item) {
//           return data.Item;
//       } else {
//           console.log('No role data found for user');
//           return null;
//       }
//   } catch (error) {
//       console.error('Error fetching user role from DynamoDB:', error);
//       return null;
//   }
// };