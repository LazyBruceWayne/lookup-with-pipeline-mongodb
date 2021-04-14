{
    "$lookup": {
        "from": "comments",
        "let": {
            "postId": "$postId"
        },
        "pipeline": [{
                "$match": {
                    $and: [{
                            "$expr": {
                                "$eq": ["$postId", "$$postId"]
                            }
                        },
                        {
                            "$expr": {
                                "$eq": ["$dstatus", 1]
                            }
                        }
                    ]
                }
            },
            {
                "$sort": {
                    "created": -1
                }
            }, {
                "$limit": 2
            },
            {

                $lookup: {
                    from: "users",
                    localField: "commentId",
                    foreignField: "t_uid",
                    as: "usersDetails"
                }
            },
            {
                $project: {
                    postId: 1,
                    commentId: 1
                    reaction: {
                        "$switch": {
                            "branches": [

                                {
                                    "case": {
                                        $in: [usertId, {
                                            $ifNull: ["$emojis.laugh", []]
                                        }]
                                    },
                                    "then": "laugh"
                                },
                                {
                                    "case": {
                                        $in: [usertId, {
                                            $ifNull: ["$emojis.like", []]
                                        }]
                                    },
                                    "then": "like"
                                },
                                {
                                    "case": {
                                        $in: [usertId, {
                                            $ifNull: ["$emojis.love", []]
                                        }]
                                    },
                                    "then": "love"
                                },
                                {
                                    "case": {
                                        $in: [usertId, {
                                            $ifNull: ["$emojis.ill", []]
                                        }]
                                    },
                                    "then": "ill"
                                },
                                {
                                    "case": {
                                        $in: [usertId, {
                                            $ifNull: ["$emojis.haha", []]
                                        }]
                                    },
                                    "then": "haha"
                                }
                            ],
                            "default": ""
                        }

                    }
                }
            }
        ],
        "as": "user_detail"
    }
}
