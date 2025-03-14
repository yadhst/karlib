import {
  type User,
  type Work,
  type Bookmark,
  type History,
} from "@/lib/database/schema";

export type Action = "create" | "read" | "update" | "delete";
export type Resource = {
  user: {
    dataType: User;
    action: Exclude<Action, "create" | "delete">;
  };
  work: {
    dataType: Work;
    action: Action;
  };
  bookmark: {
    dataType: Bookmark;
    action: Exclude<Action, "update">;
  };
  history: {
    dataType: History;
    action: Action;
  };
};

export type ResourceDataType<R extends keyof Resource> =
  Resource[R]["dataType"];

export type BasePermissionCheck<R extends keyof Resource> =
  | boolean
  | ((user: User, target: ResourceDataType<R>) => boolean);
export type PropertyBasedPermissionCheck<R extends keyof Resource> = {
  granted: BasePermissionCheck<R>;
  restrictedProperties?: (keyof ResourceDataType<R>)[];
  deniedProperties?: (keyof ResourceDataType<R>)[];
};
export type PermissionCheck<R extends keyof Resource> =
  | BasePermissionCheck<R>
  | PropertyBasedPermissionCheck<R>;

const ownSelf = (user: User, target: User) => user.id === target.id;
const ownDraftedWork = (user: User, target: Work) =>
  user.id === target.publisherId && target.publishedTimestamp === null;
const ownBookmark = (user: User, target: Bookmark) => user.id === target.userId;
const ownHistory = (user: User, target: History) => user.id === target.userId;

export type Rule = Record<
  User["role"],
  {
    [R in keyof Resource]: Record<Resource[R]["action"], PermissionCheck<R>>;
  }
>;
export const rules = {
  /** Admin Permissions */
  Admin: {
    user: {
      read: true,
      update: {
        granted: (user: User, target: User) =>
          !ownSelf(user, target) && target.role !== "Admin",
        restrictedProperties: ["role"],
      },
    },
    work: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    bookmark: {
      create: true,
      read: ownBookmark,
      delete: ownBookmark,
    },
    history: {
      create: true,
      read: ownHistory,
      update: {
        granted: ownHistory,
        restrictedProperties: ["timestamp"],
      },
      delete: ownHistory,
    },
  },

  /** Consultant Permissions */
  Consultant: {
    user: {
      read: ownSelf,
      update: false,
    },
    work: {
      create: true,
      read: true,
      update: {
        granted: ownDraftedWork,
        deniedProperties: ["publishedTimestamp", "createdTimestamp"],
      },
      delete: ownDraftedWork,
    },
    bookmark: {
      create: true,
      read: ownBookmark,
      delete: ownBookmark,
    },
    history: {
      create: true,
      read: ownHistory,
      update: {
        granted: ownHistory,
        restrictedProperties: ["timestamp"],
      },
      delete: ownHistory,
    },
  },

  /** General User Permissions */
  User: {
    user: {
      read: ownSelf,
      update: false,
    },
    work: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    bookmark: {
      create: true,
      read: ownBookmark,
      delete: ownBookmark,
    },
    history: {
      create: true,
      read: ownHistory,
      update: {
        granted: ownHistory,
        restrictedProperties: ["timestamp"],
      },
      delete: ownHistory,
    },
  },
} as const satisfies Rule;
