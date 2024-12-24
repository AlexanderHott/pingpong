import { useMutation, useQuery } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";

export function useActionGroups() {
  return useQuery({
    queryFn: () => db.query.actionGroups.findMany({ with: { actions: true } }),
    queryKey: ["actionGroups"],
  });
}

export function useActionGroup(groupId: number) {
  return useQuery({
    queryFn: () =>
      db.query.actionGroups.findFirst({
        where: eq(schema.actionGroups.id, groupId),
        with: { actions: true },
      }),
    queryKey: ["actionGroup"],
  });
}

export function createActionGroup() {
  return useMutation({
    mutationFn: (name: string) =>
      db.insert(schema.actionGroups).values({ name }).returning(),
    mutationKey: ["actionGroup"],
  });
}

export function createAction() {
  return useMutation({
    mutationFn: (data: schema.ActionInsert) =>
      db.insert(schema.actions).values(data).returning(),
    mutationKey: ["action", "actionGroup"],
  });
}
