import { auth, db, firebase } from './firebase';

// create user
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign Up
export const logoutAfterCreated = () => auth.signOut();

export function getAuthPlayer() {
  return auth.currentUser;
}

// Sign In user client
export function doSignInWithEmailAndPassword(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log('🚀 ~ file: auth.js:19 ~ returnnewPromise ~ user', user);

      if (!user) {
        return resolve({
          code: 200,
          message: 'E-mail e/ou senha não informados!',
          success: false,
          data: undefined,
        });
      }

      const userSnapshot = await db
        .ref(`Users/${user.uid}`)
        .once('value')
        .then((userSnapshot) => userSnapshot.val());
      console.log(
        '🚀 ~ file: auth.js:35 ~ returnnewPromise ~ userSnapshot',
        userSnapshot,
      );

      if (userSnapshot) {
        return resolve({
          code: 200,
          message: `User localizado com sucesso`,
          success: true,
          data: userSnapshot,
        });
      } else {
        console.log('usuario nao pertence a nenhum cliente');
        return reject({
          code: 200,
          message: `User não localizado`,
          success: false,
        });
      }
    } catch (error) {
      // console.log('erro doSignInWithEmailAndPassword-->', error);
      reject(error);
    }
  });
}

// Sign In admin
export const doSignInWithEmailAndPasswordAdmin = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

// Get Auth User
export const getAuthUser = () => auth.currentUser;

export const getAuthUserToken = () => {
  return new Promise((resolve, reject) => {
    auth.currentUser
      .getIdToken()
      .then((authToken) => {
        const stringToken = `PARKAGILE ${authToken}`;
        resolve(stringToken);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Boolean to check if user is logged
export const userLogged = () => auth.currentUser !== null;

//update password
export const updatePassword = (
  currentPassword,
  newPassword,
  confirmNewPassword,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          if (newPassword !== confirmNewPassword) {
            console.log('Senha nova e senha de confirmação não são iguais.');
            return reject({
              message: 'Senha nova e senha de confirmação não são iguais.',
              success: false,
            });
          } else {
            user
              .updatePassword(confirmNewPassword)
              .then(() => {
                return resolve({
                  message: 'Senha alterada com sucesso.',
                  success: true,
                });
              })
              .catch((error) => {
                console.log('Erro ao alterar a senha.', error);
                return reject({
                  message: 'Erro ao alterar a senha.',
                  success: false,
                });
              });
          }
        })
        .catch((error) => {
          console.log('Senha atual não confere.', error);
          return reject({
            message: 'Senha atual não confere.',
            success: false,
          });
        });
    } catch (error) {
      return reject({
        message: 'Não foi possível alterar a senha',
        success: false,
      });
    }
  });
};
