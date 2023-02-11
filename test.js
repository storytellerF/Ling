import LING from "./index.js"

// const jsonString = "{\"id\": 1610942076946493412, \"offered\": true, \"group\": {\"name\": \"jn\", \"address\": \"hello world\"}, \"top up\": [456, 789], \"decimal\":6.88}"
const jsonString = `
{
    "uid": 1429691277730824200,
    "nickname": "♨🍑",
    "socialId": "hii",
    "socialIdModified": 2,
    "bio": "shaua\n\neaue\nua\neu\nae\nu\nao\n\n\neou\nao\ne\n\nia\nuiaekaiueiae\n⊠www.baidu.com\n⊠https://web.spongekit.com/s/u/hii\n\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\ne\nea\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na",
    "richFormat": {
      "version": 4,
      "attachmentSpans": [
        {
          "start": 54,
          "end": 68,
          "data": {
            "type": "link",
            "link": {
              "style": "inline",
              "customTitle": "www.baidu.com",
              "url": "www.baidu.com"
            }
          }
        },
        {
          "start": 69,
          "end": 103,
          "data": {
            "type": "link",
            "link": {
              "style": "inline",
              "customTitle": "https://web.spongekit.com/s/u/hii",
              "url": "https://web.spongekit.com/s/u/hii"
            }
          }
        }
      ]
    },
    "gender": 1,
    "status": 1,
    "icon": {
      "mediaId": 1552952954763804700,
      "baseUrl": "http://um1.spongekit.com/2029/1552952954763804672-v2-r440x440-s0x0.jpeg",
      "resourceList": [
        {
          "width": 440,
          "height": 440,
          "url": "http://um1.spongekit.com/2029/1552952954763804672-v2-r440x440-s440x440.webp"
        },
        {
          "width": 128,
          "height": 128,
          "url": "http://um1.spongekit.com/2029/1552952954763804672-v2-r440x440-s128x128.webp",
          "thumbnail": true
        },
        {
          "width": 68,
          "height": 68,
          "url": "http://um1.spongekit.com/2029/1552952954763804672-v2-r440x440-s68x68.webp",
          "thumbnail": true
        }
      ]
    },
    "chatInvitationStatus": 1,
    "publicChatInvitationStatus": 1,
    "privateChatInvitationStatus": 1,
    "circleInvitationStatus": 1,
    "extensions": {
      "adminPartyOnlineStatus": 2,
      "openDaysInRow": 3,
      "maxOpenDaysInRow": 13,
      "lastOpenDate": "2023-02-08T00:00:00Z",
      "appRated": true,
      "stickerClaimedMask": 2,
      "chatBubbleColor": "#846CAA",
      "previewBlogIds": [
        1539054474238320600,
        1539096125784281000,
        1590536638582734800,
        1605882520198803500
      ],
      "ignoreReviewMode": true,
      "showRecentVisitor": true,
      "showCircleMemberships": true,
      "showMyTreasures": true
    },
    "onlineStatus": 1,
    "createdTime": 1629699937,
    "contentRegion": 1,
    "contentRegionName": "English",
    "userMood": {
      "type": 3,
      "stickerId": 1004634433550890200,
      "text": "Studying",
      "onlineStatus": 1,
      "sticker": {
        "stickerId": 1004634433550890200,
        "name": "📚",
        "media": {
          "baseUrl": "https://sys.projz.com/emoji/256/1f4da.png",
          "resourceList": [
            {
              "width": 256,
              "height": 256,
              "url": "https://sys.projz.com/emoji/256/1f4da.png"
            },
            {
              "width": 128,
              "height": 128,
              "url": "https://sys.projz.com/emoji/128/objects/1f4da.png"
            },
            {
              "width": 64,
              "height": 64,
              "url": "https://sys.projz.com/emoji/64/objects/1f4da.png"
            }
          ]
        }
      }
    },
    "showsSchool": 1,
    "school": "test school",
    "lastActiveTime": 1675836706,
    "showsLocation": 1,
    "location": {
      "address": {
        "zh": "上海市"
      }
    },
    "nameCardEnabled": 1,
    "matchEnabled": 1,
    "nameCardBackground": {
      "mediaId": 1453236622553170000,
      "baseUrl": "http://sys.spongekit.com/7298/1453236622553169920-v1-r1125x2436-s0x0.webp",
      "resourceList": [
        {
          "width": 1125,
          "height": 2436,
          "url": "http://sys.spongekit.com/7298/1453236622553169920-v1-r1125x2436-s0x0.webp"
        }
      ]
    },
    "background": {
      "mediaId": 1590919421875548200,
      "baseUrl": "http://sys.spongekit.com/7039/1590919421875548160-v1-r1124x2436-s0x0.png",
      "resourceList": [
        {
          "width": 1124,
          "height": 2436,
          "url": "http://sys.spongekit.com/7039/1590919421875548160-v1-r1124x2436-s1124x2436.png"
        },
        {
          "width": 695,
          "height": 1508,
          "url": "http://sys.spongekit.com/7039/1590919421875548160-v1-r1124x2436-s472x1024.png"
        },
        {
          "width": 347,
          "height": 754,
          "url": "http://sys.spongekit.com/7039/1590919421875548160-v1-r1124x2436-s236x512.png"
        }
      ]
    },
    "voiceBio": {
      "mediaId": 1522425217664753700,
      "baseUrl": "http://ca1.spongekit.com/8119/1522425217664753664-v1-98-0-5862.aac",
      "resourceList": [
        {
          "width": 1,
          "height": 1,
          "url": "http://ca1.spongekit.com/8119/1522425217664753664-v1-98-0-5862.aac",
          "duration": 5862
        }
      ]
    },
    "previewMediaList": [
      {
        "mediaId": 1610821547068457000,
        "baseUrl": "http://cm1.spongekit.com/2639/1610821547068456960-v2-r970x707-s0x0.png",
        "resourceList": [
          {
            "width": 970,
            "height": 707,
            "url": "http://cm1.spongekit.com/2639/1610821547068456960-v2-r970x707-s970x707.webp"
          },
          {
            "width": 599,
            "height": 437,
            "url": "http://cm1.spongekit.com/2639/1610821547068456960-v2-r970x707-s512x373.webp"
          }
        ]
      },
      {
        "mediaId": 1610821646225997800,
        "baseUrl": "http://cm1.spongekit.com/2639/1610821646225997824-v2-r750x1076-s0x0.png",
        "resourceList": [
          {
            "width": 750,
            "height": 1076,
            "url": "http://cm1.spongekit.com/2639/1610821646225997824-v2-r750x1076-s750x1076.webp"
          },
          {
            "width": 426,
            "height": 614,
            "url": "http://cm1.spongekit.com/2639/1610821646225997824-v2-r750x1076-s356x512.webp"
          }
        ]
      },
      {
        "mediaId": 1590536636598829000,
        "baseUrl": "http://cm1.spongekit.com/6039/1590536636598829056-v2-r1155x104-s0x0.png",
        "resourceList": [
          {
            "width": 1155,
            "height": 104,
            "url": "http://cm1.spongekit.com/6039/1590536636598829056-v2-r1155x104-s1155x104.webp"
          }
        ]
      },
      {
        "mediaId": 1539096112765161500,
        "baseUrl": "http://cm1.spongekit.com/4619/1539096112765161472-v1-r200x155-s0x0.gif",
        "resourceList": [
          {
            "width": 200,
            "height": 155,
            "url": "http://cm1.spongekit.com/4619/1539096112765161472-v1-r200x155-s200x155.gif"
          }
        ]
      },
      {
        "mediaId": 1539054465686134800,
        "baseUrl": "http://cm1.spongekit.com/4619/1539054465686134784-v2-r1920x923-s0x0.png",
        "resourceList": [
          {
            "width": 1920,
            "height": 923,
            "url": "http://cm1.spongekit.com/4619/1539054465686134784-v2-r1920x923-s1920x923.webp"
          },
          {
            "width": 1477,
            "height": 709,
            "url": "http://cm1.spongekit.com/4619/1539054465686134784-v2-r1920x923-s1024x492.webp"
          },
          {
            "width": 738,
            "height": 354,
            "url": "http://cm1.spongekit.com/4619/1539054465686134784-v2-r1920x923-s512x246.webp"
          }
        ]
      }
    ],
    "tagline": "测试post 和feeds",
    "zodiacType": 10,
    "tagList": [
      {
        "tagId": 1269194498935771100,
        "tagName": "Fandom",
        "source": 1,
        "status": 1,
        "order": 1,
        "style": {
          "backgroundColor": "#9A43001E",
          "textColor": "#FF2E7E",
          "borderColor": "#FF2E7E",
          "solidColor": "#F1347C"
        }
      },
      {
        "tagId": 1269194499476836400,
        "tagName": "Aesthetic",
        "source": 1,
        "status": 1,
        "order": 2,
        "style": {
          "backgroundColor": "#9A112702",
          "textColor": "#6FC445",
          "borderColor": "#6FC445",
          "solidColor": "#6CBE44"
        }
      },
      {
        "tagId": 1269194498717667300,
        "tagName": "Animation",
        "source": 1,
        "status": 1,
        "order": 3,
        "style": {
          "backgroundColor": "#9A360135",
          "textColor": "#FC38CF",
          "borderColor": "#FC38CF",
          "solidColor": "#F234C6"
        }
      },
      {
        "tagId": 1269194498788970500,
        "tagName": "Art",
        "source": 1,
        "status": 1,
        "order": 4,
        "style": {
          "backgroundColor": "#9A2C003A",
          "textColor": "#D33EFF",
          "borderColor": "#D33EFF",
          "solidColor": "#C500FF"
        }
      },
      {
        "tagId": 1297198918846083000,
        "tagName": "Crafting & DIY",
        "source": 1,
        "status": 1,
        "order": 5,
        "style": {
          "backgroundColor": "#9A050337",
          "textColor": "#737AFF",
          "borderColor": "#737AFF",
          "solidColor": "#6068FF"
        }
      },
      {
        "tagId": 1379749181528129500,
        "tagName": "Role Play",
        "source": 1,
        "status": 1,
        "order": 6,
        "style": {
          "backgroundColor": "#9A382500",
          "textColor": "#ECAC16",
          "borderColor": "#ECAC16",
          "solidColor": "#F3AA00"
        }
      },
      {
        "tagId": 1297198918678311000,
        "tagName": "Anime & Manga",
        "source": 1,
        "status": 1,
        "order": 7,
        "style": {
          "backgroundColor": "#9A391201",
          "textColor": "#FF7335",
          "borderColor": "#FF7335",
          "solidColor": "#FF793E"
        }
      },
      {
        "tagId": 1297204139609518000,
        "tagName": "Artesanato e DIY",
        "source": 1,
        "status": 1,
        "order": 8,
        "style": {
          "backgroundColor": "#9A050337",
          "textColor": "#737AFF",
          "borderColor": "#737AFF",
          "solidColor": "#6068FF"
        }
      }
    ],
    "language": "en",
    "countryCode": "GB",
    "pushEnabled": 1,
    "showsJoinedCircles": 1,
    "birthday": "2005-01-01",
    "fansCount": 19,
    "followingCount": 36,
    "friendsCount": 14,
    "blogsCount": 56,
    "commentsCount": 17,
    "commentPermissionType": 1,
    "thirdPartyUid": "00c05e74a448d713",
    "notification": {
      "receiveNewFollower": true,
      "receiveWallComment": true
    },
    "userVisitorInfo": {
      "totalViewCount": 47,
      "unreadViewCount": 7,
      "userProfileVisitMode": 2
    },
    "storeId": 1599692506290684000,
    "walletActivated": 1,
    "hasProfile": 1
  }`
console.log(LING.parse(jsonString))
console.log(JSON.parse(jsonString));
