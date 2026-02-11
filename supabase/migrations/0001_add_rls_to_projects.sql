-- 1. Enable RLS
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;

-- 2. Select Policy
CREATE POLICY "Users can view their own projects" 
ON "projects" FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

-- 3. Insert Policy
CREATE POLICY "Users can create their own projects" 
ON "projects" FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 4. Update Policy
CREATE POLICY "Users can update their own projects" 
ON "projects" FOR UPDATE TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. Delete Policy
CREATE POLICY "Users can delete their own projects" 
ON "projects" FOR DELETE TO authenticated 
USING (auth.uid() = user_id);