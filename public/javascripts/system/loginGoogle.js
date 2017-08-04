// console.log('google.js');

var provider = new firebase.auth.GoogleAuthProvider();

angular.module('CinemaApp').controller('loginGoogleController', ['$scope',
    function($scope) {

        // console.log('Controller google');

        $scope.loginGoogle = function() {
            // console.log('func google');

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                firebase.database().ref('listUsers/' + user.uid).once('value')
                    .then(function(snapshot) {
                        // console.log(snapshot);
                        if (snapshot.val() === null) {
                            // console.log('null');
                            addUserToDatabase(user);
                        } else {
                            window.location.href = '/';
                        }
                    });

            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // console.log(errorCode, errorMessage, email, credential);
                window.location.href = '/';
            });
        }

        function addUserToDatabase(user) {
            // console.log(user);
            firebase.database().ref('listUsers/' + user.uid).set({
                email: user.email,
                username: user.displayName,
            }).then(function() {
                window.location.href = '/';
            });
        }
    }
]);