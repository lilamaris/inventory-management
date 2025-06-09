# 재고관리 애플리케이션

Next.js + Prisma ORM(postgres) 를 이용한 재고관리(Inventory management) 애플리케이션입니다.

프로젝트 목표는 다음과 같이 설정했습니다.

## 프로젝트 목표

-   Next.js + Prisma + PostgreSQL 기반 재고 관리 시스템 구축
-   사용자 인증(Authentification) 및 권한(Authorization) 관리 기능 포함
-   재고(Item), 사용자(User), 권한(Role/Permission) 등 CRUD 기능 포함
-   RBAC(Role-Based Access Control)로 세분화된 접근 제어 구현
-   인증 및 인가는 JWT(Json Web Token) 사용
-   UI는 shadcn + TailwindCSS를 기본 디자인 시스템으로 이용

## 핵심 기능

**1. 인증(Authentification)**

-   회원 가입 / 로그인 / 로그아웃
-   JWT 발급 및 검증
-   서버측(SSR) 요청 시 쿠키에 저장된 JWT로 세션 검증

**2. 인가(Authorization) / RBAC**
- *Domain*, *Resource*, *Action*으로 이뤄진 Permission 테이블
- Action: _Create_, _Read_, _Update_, _Delete_ 행동
- Resource: 애플리케이션에서 다루는 자원 (Inventory, Transaction, User 등)
- Domain: 자원이 속한 범위 (창고 Id 등)
- Role <-> Permission 매핑을 통해 권한 부여
- 요청 시 사용자 Role 확인 -> 해당 Role에 적합한 Permission 있는지 검사

**3. 재고 관리(Inventory management)**

-   재고 품목(Item) CRUD
-   품목별 재고 수량 관리 (입, 출고 내역)
-   필터링 기능

**4. 사용자 관리(User management)**

-   사용자(User) CRUD
-   Role 할당

**5. 권한(Role/Permission) 관리**

-   Role CRUD
-   Permission 정의 및 편집
-   Role <-> Permission 매핑 관리

## 사용 기술 스택 요약

-   **Frontend, Backend**: Next.js (React 기반, SSR)
-   **ORM / Database**: Prisma ORM + PostgreSQL
-   **AuthN / AuthZ**: Auth.js (NextAuth.js) + RBAC(Role-Based Access Control)
-   **UI**: shadcn + TailwindCSS
-   **Utility**: Zod (입력 값 검증), bcrypt (해싱)
