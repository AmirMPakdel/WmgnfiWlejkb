var env = {

    ENVIRONMENT_MODE: "dev",

    MOCKING_SERVER: false,

    FILL_FAKE_DATA: false,

    SMS_TIMER: 120,

    TENANT_KEY: "__mgnftnt",

    TOKEN_KEY: "__mgnftk",

    DOMAIN: "http://tootifa.ir",

    CONVERTOR_DOMAIN: "http://tootifa.ir/conv",

    MEDIA_PREFIX: "http://dltest.tootifa.ir",

    VERIFICATION_CODE_LENGTH : 4,

    LIMITS:{
        TOTAL_EDUCATOR_LIMIT: 100,
        MAX_COURSE_SUBJECTS: 5,
        MAX_COURSE_REQUIREMENTS: 5,
        MAX_COURSE_HEADINGS: 5,
        MAX_COURSE_HEADING_CONTENTS: 5,
        MIN_VALID_CONTENTS_PUBLISH:5,
        MIN_VALID_TITLE_LENGTH:5,
        MIN_VALID_COURSE_DURATION: 1,
        MIN_VALID_SHORT_DESC:50,
        MIN_VALID_LONG_DESC:100,
        MIN_VALID_COURSE_SUBJECTS:3,
    },

    STORAGE_KEYS:{
        PHONE_NUMBER:"phone_number",
    },

    PATHS:{
        USER_AUTHENTICATION: "/minfo/auth",
        CHANGE_PASSWORD_PAGE: "/minfo/changePassword",
        MINFO_TERMS: "/minfo/terms",
        MINFO_PRIVACY: "/minfo/privacy",
        COURSE: "/course/",
        COURSE_INVOICE: "/courseInvoice/",
        USER_DASHBOARD: "/dashboard",
        USER_MYCOURSES: "/dashboard/myCourses",
        USER_NEW_COURSE: "/dashboar/newCourse",
        USER_BUY_CREDIT: "/dashboard/buyCredit",
    },

    PREFIXES:{
        MA : "/api/main",
        UTA : "/api/tenant/user",
        PTA : "/api/tenant/public",
        PSTA : "/api/tenant/student/public",
        STA : "/api/tenant/student",
        AA : "/api/app",
    },

    CREDIT_BUY_AMOUNTS:[
        100000,
        200000,
        500000,
        800000,
        1000000,
        1500000,
        2000000,
    ],

    THEME:theme,

    SC:consts.SC,

    CSC:consts.CSC,

    EP:consts.EP,

    UT:consts.UT,

    CT:consts.CT,
}