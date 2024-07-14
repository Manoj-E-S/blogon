export interface Author {
    _id: string;
    username: string;
    profileImage: string;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    coverImage: string,
    authorId: Author;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    _id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}