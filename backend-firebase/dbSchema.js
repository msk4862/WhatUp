let db = {
    posts: [
        {
            userHandle: "user",
            userImage: "",
            bodyMeta: "this is body meta",
            body: "this is body",
            createdAt: "2020-09-08T11:04:03.724Z", //ISO string
            likeCount: 2,
            commentsCount: 4,
        },
    ],

    comments: [
        {
            userHandle: "user",
            postId: "7wIhyf6oNo3jMiTzeZWG",
            body: "asuh ashiash",
            imageUrl: "user image",
            createdAt: "ISO string",
        }
    ],

    notification: [
        {
            recipient: "user",
            sender: "sender_user",
            read: "true | false",
            postId: "",
            type: "like|comment",
            createdAt: "ISO string"
        }
    ],

    users: [
        {
            credentials: {
                userId: "KUgsaashkashkasgyuas",
                email: "email@email.com",
                handle: "msk",
                createdAt: "ISO string",
                imageUrl: "firebase url",
                bio: "bio",
                website: "https://a.com",
                Location: "Delhi, IN",
            },
            likes: [
                {
                    userHandle: "user",
                    postId: "7wIhyf6oNo3jMiTzeZWG" 
                },
                {
                    userHandle: "user",
                    postId: "7wIhyf6oNo3jMiTzeZWG" 
                }
            ]
        }
    ]
}