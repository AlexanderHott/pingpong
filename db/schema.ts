import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const actions = sqliteTable(
  "aciton",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    groupId: integer().notNull(),
    method: text().notNull(),
    headers: text({ mode: "json" }).$type<[string, string][]>().notNull(),
    url: text().notNull(),
  },
  (_t) => [],
);

export const actionsRelations = relations(actions, ({ one, many }) => ({
  group: one(actionGroups, {
    fields: [actions.groupId],
    references: [actionGroups.id],
  }),
  responses: many(responses),
}));

export type Action = typeof actions.$inferSelect;
export type ActionWithResponses = Action & { responses: Response[] };
export type ActionInsert = typeof actions.$inferInsert;

export const actionGroups = sqliteTable(
  "actionGroups",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull().unique(),
  },
  (_t) => [],
);

export const actionGroupsRelations = relations(actionGroups, ({ many }) => ({
  actions: many(actions),
}));

export type ActionGroup = typeof actionGroups.$inferSelect;
export type ActionGroupWithActions = ActionGroup & { actions: Action[] };
export type ActionGroupWithActionsWithResponses = ActionGroup & {
  actions: ActionWithResponses[];
};
export type ActionGroupInsert = typeof actionGroups.$inferInsert;

export const responses = sqliteTable(
  "request",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    actionId: integer().notNull(),
    headers: text({ mode: "json" }).$type<[string, string][]>().notNull(),
    body: text().notNull(),
    statusCode: integer().notNull(),
    roundTripTime: integer({ mode: "timestamp_ms" }).notNull(),
  },
  (_t) => [],
);

export const responsesRelations = relations(responses, ({ one }) => ({
  action: one(actions, {
    fields: [responses.actionId],
    references: [actions.id],
  }),
}));

export type Response = typeof responses.$inferSelect;
export type ResponseInsert = typeof responses.$inferInsert;
