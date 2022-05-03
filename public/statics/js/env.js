var env = {

    ENVIRONMENT_MODE: "dev",

    MOCKING_SERVER: false,

    FILL_FAKE_DATA: false,

    SMS_TIMER: 120,

    TENANT_KEY: "__mgnftnt",

    TOKEN_KEY: "__mgnftk",

    STUDENT_TOKEN_KEY: "__mgnstk",

    DOMAIN: "http://minfo.ir",

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
        MIN_CREDIT_BUY_AMOUNT:50000,
    },

    STORAGE_KEYS:{
        PHONE_NUMBER:"phone_number",
    },

    PATHS:{
        //minfo
        USER_AUTHENTICATION: "/minfo/auth",
        CHANGE_PASSWORD_PAGE: "/minfo/changePassword",
        MINFO_TERMS: "/minfo/terms",
        MINFO_PRIVACY: "/minfo/privacy",
        //studen panel
        STUDENT_COURSES: "/stdPanel/myCourses",
        STUDENT_WISHLIST: "/stdPanel/myWishlist",
        STUDENT_RECIEPTS: "/stdPanel/myReciepts",
        STUDENT_EDIT_PROFILE: "/stdPanel/editProfile",
        STUDENT_VIEW_RECIEPT: "/stdPanel/viewReciept/",
        //user index
        HOMEPAGE: "/",
        COURSE: "/course/",
        COURSE_INVOICE: "/courseInvoice/",
        STUDENT_CHANGE_PASSWORD: "/changePassword",
        //user dashboard
        USER_OVERVIEW: "/dashboard/overview",
        USER_MYCOURSES: "/dashboard/myCourses",
        USER_NEW_COURSE: "/dashboard/newCourse",
        USER_BUY_CREDIT: "/dashboard/buyCredit",
        USER_EDIT_COURSE: "/dashboard/editCourse/",
        USER_PREVIEW_COURSE: "/dashboard/previewCourse/",
        USER_FINANCIAL_REPORT: "/dashboard/financialReports",
    },

    PREFIXES:{
        MA : "/api/main",
        UTA : "/api/tenant/user",
        PTA : "/api/tenant/public",
        PSTA : "/api/tenant/student/public",
        STA : "/api/tenant/student",
        STIA : "/api/tenant/inner/student",
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