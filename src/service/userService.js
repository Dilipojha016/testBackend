const mongoose = require("mongoose");

module.exports = class UserService {
    /**
     * Method to get number of weeks in a month
     * @param {*} startDate - start date of a month ->> Format must be yyyy-mm-dd
     * @param {*} endDate  - end date of a month ->>Format must be yyyy-mm-dd
     * @returns number of weeks
     */
    getWeeksInMonth(start_date, end_date) {
        let weeks = 0;
        let startDate = new Date(start_date);
        let endDate = new Date(end_date);
        for (let i = startDate.getDate(); i <= endDate.getDate(); i = (new Date(startDate.setDate(i)).getDate() + (6 - new Date(startDate.setDate(i)).getDay()) + 1)) {
            weeks++;
        }
        return weeks;
    }

    /**
     * queries for my activity api
     */
    getUserActivityQuery(req, inputArr, startDate, endDate) {
        let query;
        if (req.body.data == 'year') {
            query = [
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(req.user._id),
                        deleted: { $ne: 1 }
                    }
                },
                {
                    $project: {
                        activityTypeId: "$activityTypeId",
                        matchDate: {
                            $dateToString: {
                                format: "%m",
                                date: "$startTime"
                            }
                        },
                        year: {
                            $dateToString: {
                                format: "%Y",
                                date: "$startTime"
                            }
                        },
                        steps: "$steps",
                        distance: "$distance",
                        createdAt: 1,
                    }
                },
                {
                    $group: {
                        _id: {
                            matchDate: "$matchDate",
                            year: "$year"
                        },
                        totalSteps: { $sum: "$steps" },
                        totalDistance: { $sum: "$distance" },
                        activityTypeData: { $addToSet: "$activityTypeId" }
                    }
                },
                {
                    $match: {
                        "_id.year": req.body.year
                    }
                },
                {
                    $lookup: {
                        from: "useractivities",
                        let: { "activityIds": "$activityTypeData", "matchDate": "$_id.matchDate" },
                        pipeline: [
                            {
                                $addFields: {
                                    matchDate: {
                                        $dateToString: {
                                            format: "%m",
                                            date: "$startTime"
                                        }
                                    }
                                }
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$matchDate", "$$matchDate"] },
                                            { $in: ["$activityTypeId", "$$activityIds"] }
                                        ]
                                    },
                                    userId: new mongoose.Types.ObjectId(req.user._id)
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        activityId: "$activityTypeId"
                                    },
                                    totalSteps: { $sum: "$steps" },
                                    totalDistance: { $sum: "$distance" }
                                }
                            },
                            {
                                $lookup: {
                                    from: "activities",
                                    localField: "_id.activityId",
                                    foreignField: "_id",
                                    as: "activityDetail"
                                }
                            },
                            {
                                $project: {
                                    activityId: "$_id.activityId", totalSteps: 1, totalDistance: 1, _id: 0,
                                    activityIcon: { $arrayElemAt: ["$activityDetail.icon", 0] },
                                    activityName: { $arrayElemAt: ["$activityDetail.name", 0] },
                                    activityType: { $arrayElemAt: ["$activityDetail.type", 0] }
                                }
                            }
                        ],
                        as: "activityData"
                    }
                },
                {
                    $group: {
                        _id: null,
                        stats: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        stats: {
                            $map: {
                                input: inputArr,
                                as: "currMonth",
                                in: {
                                    $let: {
                                        vars: { currIndex: { $indexOfArray: ["$stats._id.matchDate", "$$currMonth"] } },
                                        in: {
                                            $cond: {
                                                if: { $ne: ["$$currIndex", -1] },
                                                then: { $arrayElemAt: ["$stats", "$$currIndex"] },
                                                else: { _id: { matchDate: "$$currMonth" }, totalSteps: 0, totalDistance: 0, activityData: [] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $unwind: "$stats"
                },
                {
                    $replaceRoot: {
                        newRoot: "$stats"
                    }
                },
                {
                    $project: {
                        month: "$_id.matchDate", activityData: 1,
                        totalSteps: 1, totalDistance: 1, "_id": 0
                    }
                }
            ]
        } else if (req.body.data == 'week') {
            query = [
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(req.user._id),
                        deleted: { $ne: 1 }
                    }
                },
                {
                    $project: {
                        activityTypeId: "$activityTypeId",
                        matchDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$startTime"
                            }
                        },
                        steps: "$steps",
                        distance: "$distance",
                        createdAt: 1,
                        day: { $dayOfWeek: "$startTime" }
                    }
                },
                {
                    $group: {
                        _id: {
                            matchDate: "$matchDate",
                            day: "$day"
                        },
                        totalSteps: { $sum: "$steps" },
                        totalDistance: { $sum: "$distance" },
                        activityTypeData: { $addToSet: "$activityTypeId" }
                    }
                },
                {
                    $project: {
                        _id: { matchDate: 1, day: 1, createdAt: { $dateFromString: { dateString: "$_id.matchDate" } } },
                        totalSteps: 1, totalDistance: 1, activityTypeData: 1
                    }
                },
                {
                    $match: {
                        "_id.createdAt": {
                            $gte: new Date(startDate),
                            $lt: new Date(endDate)
                        }
                    }
                },
                {
                    $lookup: {
                        from: "useractivities",
                        let: { "activityIds": "$activityTypeData", "matchDate": "$_id.matchDate" },
                        pipeline: [
                            {
                                $addFields: {
                                    matchDate: {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$startTime"
                                        }
                                    }
                                }
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$activityTypeId", "$$activityIds"] },
                                            { $eq: ["$matchDate", "$$matchDate"] }
                                        ]
                                    },
                                    userId: new mongoose.Types.ObjectId(req.user._id)
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        activityId: "$activityTypeId"
                                    },
                                    totalSteps: { $sum: "$steps" },
                                    totalDistance: { $sum: "$distance" }
                                }
                            },
                            {
                                $lookup: {
                                    from: "activities",
                                    localField: "_id.activityId",
                                    foreignField: "_id",
                                    as: "activityDetail"
                                }
                            },
                            {
                                $project: {
                                    activityId: "$_id.activityId", totalSteps: 1, totalDistance: 1, _id: 0,
                                    activityIcon: { $arrayElemAt: ["$activityDetail.icon", 0] },
                                    activityName: { $arrayElemAt: ["$activityDetail.name", 0] },
                                    activityType: { $arrayElemAt: ["$activityDetail.type", 0] }
                                }
                            }
                        ],
                        as: "activityData"
                    }
                },
                {
                    $group: {
                        _id: null,
                        stats: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        stats: {
                            $map: {
                                input: inputArr,
                                as: "currDate",
                                in: {
                                    $let: {
                                        vars: { currIndex: { $indexOfArray: ["$stats._id.matchDate", "$$currDate"] }, currIsoDate: { $dateFromString: { dateString: "$$currDate" } } },
                                        in: {
                                            $cond: {
                                                if: { $ne: ["$$currIndex", -1] },
                                                then: { $arrayElemAt: ["$stats", "$$currIndex"] },
                                                else: { _id: { matchDate: "$$currDate", createdAt: "$$currIsoDate", day: { $dayOfWeek: "$$currIsoDate" } }, totalSteps: 0, totalDistance: 0, activityData: [] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $unwind: "$stats"
                },
                {
                    $replaceRoot: {
                        newRoot: "$stats"
                    }
                },
                {
                    $project: {
                        createdAt: "$_id.createdAt", day: "$_id.day", activityData: 1,
                        totalSteps: 1, totalDistance: 1, "_id": 0
                    }
                }
            ]
        } else if (req.body.data == 'day') {
            query = [
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(req.user._id),
                        deleted: { $ne: 1 }
                    }
                },
                {
                    $project: {
                        activityTypeId: "$activityTypeId",
                        matchDate: {
                            $dateToString: {
                                format: "%H",
                                date: "$startTime"
                            }
                        },
                        steps: "$steps",
                        distance: "$distance",
                        createdAt: "$startTime",
                    }
                },
                {
                    $match: {
                        "createdAt": {
                            $gte: new Date(startDate),
                            $lt: new Date(endDate)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            matchDate: "$matchDate",
                        },
                        totalSteps: { $sum: "$steps" },
                        totalDistance: { $sum: "$distance" },
                        activityTypeData: { $addToSet: "$activityTypeId" }
                    }
                },
                {
                    $lookup: {
                        from: "useractivities",
                        let: { "activityIds": "$activityTypeData", "matchDate": "$_id.matchDate" },
                        pipeline: [
                            {
                                $addFields: {
                                    matchDate: {
                                        $dateToString: {
                                            format: "%H",
                                            date: "$startTime"
                                        }
                                    }
                                }
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$activityTypeId", "$$activityIds"] },
                                            { $eq: ["$matchDate", "$$matchDate"] }
                                        ]
                                    },
                                    "startTime": {
                                        $gte: new Date(startDate),
                                        $lt: new Date(endDate)
                                    },
                                    userId: new mongoose.Types.ObjectId(req.user._id),
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        activityId: "$activityTypeId"
                                    },
                                    totalSteps: { $sum: "$steps" },
                                    totalDistance: { $sum: "$distance" }
                                }
                            },
                            {
                                $lookup: {
                                    from: "activities",
                                    localField: "_id.activityId",
                                    foreignField: "_id",
                                    as: "activityDetail"
                                }
                            },
                            {
                                $project: {
                                    activityId: "$_id.activityId", totalSteps: 1, totalDistance: 1, _id: 0,
                                    activityIcon: { $arrayElemAt: ["$activityDetail.icon", 0] },
                                    activityName: { $arrayElemAt: ["$activityDetail.name", 0] },
                                    activityType: { $arrayElemAt: ["$activityDetail.type", 0] }
                                }
                            }
                        ],
                        as: "activityData"
                    }
                },
                {
                    $group: {
                        _id: null,
                        stats: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        stats: {
                            $map: {
                                input: inputArr,
                                as: "currTime",
                                in: {
                                    $let: {
                                        vars: { currIndex: { $indexOfArray: ["$stats._id.matchDate", "$$currTime"] } },
                                        in: {
                                            $cond: {
                                                if: { $ne: ["$$currIndex", -1] },
                                                then: { $arrayElemAt: ["$stats", "$$currIndex"] },
                                                else: { _id: { matchDate: "$$currTime" }, totalSteps: 0, totalDistance: 0, activityData: [] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $unwind: "$stats"
                },
                {
                    $replaceRoot: {
                        newRoot: "$stats"
                    }
                },
                {
                    $project: {
                        time: "$_id.matchDate", activityData: 1,
                        totalSteps: 1, totalDistance: 1, "_id": 0
                    }
                }
            ]
        } else if (req.body.data == 'month') {
            query = [
                {
                    $match: {
                        startTime: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        },
                        userId: new mongoose.Types.ObjectId(req.user._id),
                        deleted: { $ne: 1 }
                    }
                },
                {
                    $project: {
                        activityTypeId: "$activityTypeId",
                        steps: "$steps",
                        distance: "$distance",
                        week: { $floor: { $divide: [{ $dayOfMonth: "$startTime" }, 7] } }
                    }
                },
                {
                    $group: {
                        _id: {
                            week: "$week"
                        },
                        totalSteps: { $sum: "$steps" },
                        totalDistance: { $sum: "$distance" },
                        activityTypeData: { $addToSet: "$activityTypeId" }
                    }
                },
                {
                    $lookup: {
                        from: "useractivities",
                        let: { "activityIds": "$activityTypeData", "week": "$_id.week" },
                        pipeline: [
                            {
                                $addFields: {
                                    week: { $floor: { $divide: [{ $dayOfMonth: "$startTime" }, 7] } }
                                }
                            },
                            {
                                $match: {
                                    startTime: {
                                        $gte: new Date(startDate),
                                        $lte: new Date(endDate)
                                    },
                                    $expr: {
                                        $and: [
                                            { $in: ["$activityTypeId", "$$activityIds"] },
                                            { $eq: ["$week", "$$week"] }
                                        ]
                                    },
                                    userId: new mongoose.Types.ObjectId(req.user._id)
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        activityId: "$activityTypeId"
                                    },
                                    totalSteps: { $sum: "$steps" },
                                    totalDistance: { $sum: "$distance" }
                                }
                            },
                            {
                                $lookup: {
                                    from: "activities",
                                    localField: "_id.activityId",
                                    foreignField: "_id",
                                    as: "activityDetail"
                                }
                            },
                            {
                                $project: {
                                    activityId: "$_id.activityId", totalSteps: 1, totalDistance: 1, _id: 0,
                                    activityIcon: { $arrayElemAt: ["$activityDetail.icon", 0] },
                                    activityName: { $arrayElemAt: ["$activityDetail.name", 0] },
                                    activityType: { $arrayElemAt: ["$activityDetail.type", 0] }
                                }
                            }
                        ],
                        as: "activityData"
                    }
                },
                {
                    $group: {
                        _id: null,
                        stats: { $push: "$$ROOT" }
                    }
                },
                {
                    $project: {
                        stats: {
                            $map: {
                                input: inputArr,
                                as: "currWeek",
                                in: {
                                    $let: {
                                        vars: { currIndex: { $indexOfArray: ["$stats._id.week", "$$currWeek"] } },
                                        in: {
                                            $cond: {
                                                if: { $ne: ["$$currIndex", -1] },
                                                then: { $arrayElemAt: ["$stats", "$$currIndex"] },
                                                else: { _id: { week: "$$currWeek" }, totalSteps: 0, totalDistance: 0, activityData: [] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $unwind: "$stats"
                },
                {
                    $replaceRoot: {
                        newRoot: "$stats"
                    }
                },
                {
                    $project: {
                        week: "$_id.week", activityData: 1,
                        totalSteps: 1, totalDistance: 1, "_id": 0
                    }
                }
            ]
        }
        return query;
    }

    createSetValueOnLogin(req,existingUser) {
        let set = {};
        let flag = 0;
        if (req.body.countryName) {
            set.countryName = req.body.countryName;
            flag = 1;
        }
        if (req.body.deviceToken) {
            set.deviceToken = req.body.deviceToken;
            flag = 1;
            existingUser.deviceToken = req.body.deviceToken;
        }
        if (req.body.deviceType) {
            set.deviceType = req.body.deviceType;
            existingUser.deviceType = req.body.deviceType;
            flag = 1;
        }
        if (req.body.osVersion) {
            set.osVersion = req.body.osVersion;
            existingUser.osVersion = req.body.osVersion;
            flag = 1;
        }
        if (req.body.modelName) {
            set.modelName = req.body.modelName;
            existingUser.modelName = req.body.modelName;
            flag = 1;
        }
        return {set,flag};
    }
    createSetValueOnUpdateProfile(req) {
        let data = {
            dob: req.body.dob,
            gender: req.body.gender,
            nickname: req.body.nickname,
            activities: req.body.activity,
            unitsOfMeasure: req.body.unitsOfMeasure,
            unitOFType: req.body.unitOfType,
            category: req.body.category,
            firstName: req.body.firstName,
            bio: req.body.bio,
            lastName: req.body.lastName,
            fullName: req.body.firstName + " " + req.body.lastName,
            profilePic: req.body.profileImageUrl,
            wheelchair: req.body.wheelchair,
        };
        if (req.body.countryName) {
            data.countryName = req.body.countryName;
        }

        if (req.body.email) {
            data.email = req.body.email;
        }
        if (req.body.deviceToken) {
            data.deviceToken = req.body.deviceToken;
        }
        if (req.body.profileImageUrl) {
            data.profilePic = req.body.profileImageUrl;
        }
        if (req.body.boostr) {
            data.boostr = req.body.boostr;
        }
        if (req.body.optSetting) {
            data.optSetting = req.body.optSetting;
        }
        return data;
    }
    createSetValueOnUpdateOnBoarding(req) {
        let data = {
            dob: req.body.dob,
            gender: req.body.gender,
            nickname: req.body.nickname,
            activities: req.body.activity,
            unitsOfMeasure: req.body.unitsOfMeasure,
            unitOFType: req.body.unitOfType,
            category: req.body.category,
            onboarding: true,
            bio: req.body.bio,
            profilePic: req.body.profileImageUrl,
            activeDate: routes.getCurrentDateTime(),
        };
        if (req.body.countryName) {
            data.countryName = req.body.countryName;
        }

        if (req.body.email) {
            data.email = req.body.email;
        }
        if (req.body.deviceToken) {
            data.deviceToken = req.body.deviceToken;
        }
        if (req.body.profileImageUrl) {
            data.profilePic = req.body.profileImageUrl;
        }
        if (req.body.boostr) {
            data.boostr = req.body.boostr;
        }
        if (req.body.optSetting) {
            data.optSetting = req.body.optSetting;
        }
        if (req.body.wheelchair) {
            data.wheelchair = req.body.wheelchair;
        }
        return data;
    }

}
