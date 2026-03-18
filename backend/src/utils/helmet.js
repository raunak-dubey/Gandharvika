import helmet from "helmet";

const helmetConfig = {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://ik.imagekit.io"],
            mediaSrc: ["'self'", "data:", "https://ik.imagekit.io"],
        },
    },
};

export default helmet(helmetConfig);