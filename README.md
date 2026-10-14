# VehicleCare

Skeleton khởi tạo theo [rules.md](./rules.md) và [spec.md](./spec.md).

## Cấu trúc

- `frontend`: React + TypeScript + Vite, Material UI, React Router, TanStack Query, React Hook Form/Zod.
- `backend/src`: Clean Architecture gồm Domain, Application, Infrastructure và Api.
- `backend/tests`: test project cho Domain, Application và API integration.
- `deploy`: cấu hình reverse proxy Nginx.
- `compose.yaml`: PostgreSQL 17 cho môi trường development.

## Yêu cầu môi trường

- .NET SDK `10.0.102` (được khóa trong `global.json`)
- Node.js 22.12+ (Vite yêu cầu; bản hiện tại thấp hơn có thể build nhưng phát cảnh báo)
- Docker Desktop nếu chạy PostgreSQL bằng Compose

## Chạy local

```powershell
docker compose up -d db
dotnet run --project backend/src/VehicleCare.Api
```

Terminal khác:

```powershell
Set-Location frontend
npm install
npm run dev
```

API có Swagger ở môi trường Development và health check tại `/health`.

## Kiểm tra

```powershell
dotnet build backend/VehicleCare.slnx --configuration Release
dotnet test backend/VehicleCare.slnx --configuration Release
Set-Location frontend
npm run build
npm run test -- --run
```

Các package đã được pin trong `frontend/package-lock.json` và các file `.csproj`. Redis,
Hangfire và các kênh email/SMS/push chưa được thêm vì rules quy định chưa dùng mặc định.