

## 기술 스택
- **Frontend**: Nuxt 3
- **Server**: unjs/nitro
- **Database**: Postgres + Drizzle ORM
- **Auth**: Better Auth

## 코드 작성 규칙
### alias
app/src의 모든 파일들은 ```import * from 'app/*'```
server/src의 모든 파일들은 ```import * from 'server/*'```
로만 해야 됨. @나 ~ 등 금지 (src는 생략)
### Import
- 동적 import 금지 (`await import(...)` 사용 불가)
- 모든 import는 파일 상단에 정적으로 작성