export const blockLibrary = [
    {
        type: "header",
        label: "Navigation",
        description: "Brand name and page links",
    },
    {
        type: "hero",
        label: "Hero section",
        description: "Headline, message, and action",
    },
    {
        type: "text",
        label: "Text block",
        description: "A heading and supporting copy",
    },
    {
        type: "image",
        label: "Image placeholder",
        description: "A visual space with a caption",
    },
    {
        type: "cards",
        label: "Feature cards",
        description: "Three points in a clear grid",
    },
    {
        type: "quote",
        label: "Quote",
        description: "A customer or editorial callout",
    },
    {
        type: "signup",
        label: "Email signup",
        description: "A short form call to action",
    },
    {
        type: "footer",
        label: "Page footer",
        description: "Closing links and a short note",
    },
];

export const starterBlocks = [
    {
        id: 1,
        type: "header",
        title: "Northstar",
        text: "Features   About   Journal",
        action: "Get started",
    },
    {
        id: 2,
        type: "hero",
        title: "Make your next idea clear.",
        text: "A calm, focused place to turn a first thought into something useful.",
        action: "Explore the work",
    },
    {
        id: 3,
        type: "cards",
        title: "Everything in its place.",
        text: "Thoughtful tools   Clear progress   Room to grow",
        action: "",
    },
    {
        id: 4,
        type: "signup",
        title: "A little inspiration, now and then.",
        text: "One useful note in your inbox each month.",
        action: "Join the list",
    },
    {
        id: 5,
        type: "footer",
        title: "Northstar",
        text: "Made for ideas worth sharing.",
        action: "Privacy   Contact",
    },
];

export const createBlock = (type, id) => {
    const details = blockLibrary.find((item) => item.type === type);
    return {
        id,
        type,
        title: details?.label ?? "New section",
        text:
            details?.description ?? "Add a short description for this section.",
        action: type === "hero" || type === "signup" ? "Learn more" : "",
    };
};
