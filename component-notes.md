App (makes API calls, handles auth, and sets currentUser in context)
- props: none
- functions: editUser, addPhoto, removePhoto, login, signup, logout, getUserData
- state: currentUser, token
- links to: none
- renders: { NavBar, Loading, RoutesList }

    NavBar (UI with links to endpoints)
    - props: logout
    - functions: none
    - state: none
    - links to: Home, Login, Signup, Profile, Matches, FindMatches
    - renders: none

    Loading (UI loading component)
    - props: none
    - functions: none
    - state: none
    - links to: none
    - renders: none

    RoutesList (connects routes to endpoints)
    - props: login, signup, editUser, addPhoto, removePhoto
    - functions: none
    - state: none
    - links to: none
    - renders: { Home, Login, Signup, Profile, EditProfile, Matches, FindMatches, User } at endpoints

        Home
        - props: none
        - functions: none
        - state: none
        - links to: /login, /signup
        - renders: none

        Login
        - props: login
        - functions: handleChange, handleSubmit
        - state: loginData
        - links to: none
        - renders: none

        Signup
        - props: signup
        - functions: handleChange, handleSubmit
        - state: formData
        - links to: none
        - renders: none

        Profile (UI component that creates the profile page)
        - props: userImages, editUser, addPhoto, removePhoto
        - functions: none
        - state: none
        - links to: /:user
        - renders: { EditProfile, UserPhotos }

            EditProfile (form prepopulated with userData to update profile)
            - props: userData, editUser
            - functions: handleChange, handleSubmit
            - state: formData
            - links to: none
            - renders: none

            UserPhotos (UI component to render photos with a delete button)
            - props: userImages, removePhoto, addPhoto
            - functions: handleClick
            - state: none
            - links to: none
            - renders: AddPhoto

                PhotoForm (form to add new photo)
                - props: addPhoto
                - functions: handleSubmit
                - state: imageUrl
                - links to: none
                - renders: none

        Matches (gets API data for existing matches)
        - props: none
        - functions: getMatchedUsers
        - state: matchedUsers
        - links to: /match
        - renders: MatchesList

            MatchesList (renders individual match cards)
            - props: matchedUsers
            - functions: none
            - state: none
            - links to: none
            - renders: MatchCard

                MatchCard (UI for showing match details)
                - props: user
                - functions: none
                - state: none
                - links to: /:user
                - renders: none

        FindMatches (make API request to get potential matches, update likes and dislikes)
        - props: none
        - functions: getUnmatchedUsers, likeUser, noLlikeUser
        - state: none
        - links to: none
        - renders: UserList

            UserList (iterate through potential matches to create user listings
              and buttons for liking/disliking)
            - props: matchUser, noMatchUser
            - functions: handleLikeClick, handleDislikeClick
            - state: none
            - links to: none
            - renders: User

                User (UI to show user profile)
                - props: userInfo, userImages
                - functions: none
                - state: none
                - links to: none
                - renders: { Bio, Photos }

                    Bio (UI piece that shows a bio)
                    - props: interests, hobbies, location
                    - functions: none
                    - state: none
                    - links to: none
                    - renders: none

                    Photos (UI piece that shows photos)
                    - props: imageUrls [url1, url2,...]
                    - functions: none
                    - state: none
                    - links to: none
                    - renders: none

