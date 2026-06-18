# Deploy Button Configuration

## Vercel Deploy Button URL

```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fngoctu2008%2Fngoctu-cms&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&project-name=ngoctu-cms&repository-name=ngoctu-cms
```

## Cách tạo button cho repository của bạn:

1. Thay `ngoctu2008` bằng username GitHub của bạn
2. Thay `ngoctu-cms` bằng tên repository của bạn (nếu đổi)
3. Thêm vào README.md:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fngoctu2008%2Fngoctu-cms&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&project-name=ngoctu-cms&repository-name=ngoctu-cms)
```

## Environment Variables được yêu cầu:

| Variable | Required | Description |
|----------|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Yes | Supabase Project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Yes | Supabase Anon/Public API Key |
| SUPABASE_SERVICE_ROLE_KEY | Yes | Supabase Service Role Key |
