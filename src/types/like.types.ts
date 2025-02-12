export type LikesQueryWhere = {
  postId: number;
  user?: {
    friends: {
      some: { id: number };
    };
  };
};

export type LikeResponseItemsType<T> = {
  items: T[] | number[];
  count: number;
  isLiked: boolean;
};
