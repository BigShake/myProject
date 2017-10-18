export default {
    "ok": true,
    "code": 1,
    "mess": "成功",
    "data": {
        "mainComponent": [],
        "minorComponent": [],
        "dontHavePharmacyReview": null,
        "drugCode": null,
        "operator": null,
        "deptCode": null,
        "inhospNo": null,
        "checkType": null,
        "incompatibilityList": [
            {
                "id": "H000003",
                "name": "破伤风抗毒素注射液",
                "type": 0,
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 0
            },
            {
                "id": 1,
                "name": "鹿茸",
                "type": 1,
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 1
            },
            {
                "id": "H000004",
                "name": "磺酸钾口服液",
                "type": 1,
                "errorId": 2,
                "colors": "绿",
                "errorName": "不宜",
                "errorGrade": 1,
                "state": 1
            },
            {
                "id": 2,
                "name": "洋参",
                "type": 1,
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁止",
                "errorGrade": 1,
                "state": 1
            }
        ],
        "drugDosageList": [
            {
                "weightUpper": 100,
                "weightLower": 50,
                "crowd": 1,
                "dosageUpper": 70,
                "dosageLower": 40,
                "dosageUnit": "kg",
                "useUnit": 1,
                "crowdName": "老人",
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 1
            }
        ],
        "drugConcentrationList": [
            {
                "weightUpper": 100,
                "weightLower": 50,
                "crowd": 1,
                "concentrationUpper": 70,
                "concentrationLower": 40,
                "unit": "kg",
                "crowdName": "老人",
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 1
            }
        ],
        "drugUsageList": [
            {
                "timeUpper": 100,
                "timeLower": 50,
                "speed": 20,
                "unit": "kg/k",
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "usagecode": "kf",
                "usagename": "口服",
                "state": 1
            }
        ],
        "drugMenstruumList": [
            {
                "standanrd": "GB",
                "valueUpper": 100,
                "valueLower": 50,
                "menstruumCode": "H000003",
                "menstruumName": "破伤风抗毒素注射液",
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 1
            }
        ],
        "drugCrowdList": [
            {
                "crowd": 1,
                "crowdName": "老人",
                "errorId": 2,
                "colors": "绿",
                "errorName": "禁忌",
                "errorGrade": 1,
                "state": 1
            }
        ],
        "drugFrequencyList": [
            {
                "pcCode": "ch",
                "pcName": "餐后",
                "state": 1
            }
        ]
    }
};
