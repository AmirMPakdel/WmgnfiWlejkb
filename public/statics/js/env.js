var env = {

    ENVIRONMENT_MODE: "auto", // dev | prd | auto

    MOCKING_SERVER: false,

    FILL_FAKE_DATA: false,

    SMS_TIMER: 120,

    TIMER_INTERVAL: 1000,

    TENANT_KEY: "__mgnftnt",

    TOKEN_KEY: "__mgnftk",

    STUDENT_TOKEN_KEY: "__mgnstk",

    DOMAIN: "http://minfo.ir",

    CONVERTOR_DOMAIN: "http://minfo.ir/conv",

    MEDIA_PREFIX: "http://dl2.minfo.ir",

    VERIFICATION_CODE_LENGTH : 5,

    LIMITS:{
        TOTAL_EDUCATOR_LIMIT: 100,
        MAX_COURSE_SUBJECTS: 5,
        MAX_COURSE_REQUIREMENTS: 5,
        MAX_COURSE_HEADINGS: 5,
        MAX_COURSE_HEADING_CONTENTS: 5,
        MIN_VALID_CONTENTS_PUBLISH:1,
        MIN_VALID_TITLE_LENGTH:5,
        MIN_VALID_COURSE_DURATION: 30,
        MIN_VALID_SHORT_DESC:50,
        MIN_VALID_LONG_DESC:100,
        MIN_VALID_COURSE_SUBJECTS:2,
        MIN_CREDIT_BUY_AMOUNT:50000,
    },

    STORAGE_KEYS:{
        PHONE_NUMBER:"phone_number",
    },

    PATHS:{
        //minfo
        MINFO_HOMEPAGE: "/",
        USER_AUTHENTICATION: "/minfo/auth",
        CHANGE_PASSWORD_PAGE: "/minfo/changePassword",
        MINFO_TERMS: "/minfo/terms",
        MINFO_PRIVACY: "/minfo/privacy",
        MINFO_SELECT_SITE: "/minfo/selectSite",
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
        STUDENT_RULES:"/stdRules",
        STUDENT_CHANGE_PASSWORD: "/changePassword",
        //user dashboard
        USER_DASHBOARD: "/dashboard",
        USER_OVERVIEW: "/dashboard/overview",
        USER_MYCOURSES: "/dashboard/myCourses",
        USER_EDIT_HOMEPAGE: "/dashboard/homePage",
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

    HELP_CONTNET:helpContent,
}
