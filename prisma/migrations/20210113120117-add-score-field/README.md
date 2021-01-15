# Migration `20210113120117-add-score-field`

This migration has been generated by Joehoel at 1/13/2021, 1:01:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Score" ADD COLUMN     "score" INTEGER NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210113111327-add-score-model..20210113120117-add-score-field
--- datamodel.dml
+++ datamodel.dml
@@ -2,14 +2,13 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
-
 }
 model Game {
   id          Int           @id @default(autoincrement())
@@ -31,8 +30,9 @@
 }
 model Score {
   id          Int           @id @default(autoincrement())
+  score       Int
   Leaderboard Leaderboard[]
   user        String
   createdAt   DateTime      @default(now())
   evidence    String?
```

