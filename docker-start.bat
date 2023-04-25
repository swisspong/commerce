docker compose down -v
@REM docker compose up -d --build backend
docker compose up -d --build
@REM docker logs -f backend
@REM cmd.exe -/c ".\docker-start.bat"
@REM docker exec -it backend bash