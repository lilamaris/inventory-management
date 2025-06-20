# 재고관리 애플리케이션

Next.js + Prisma ORM(with postgresql) 를 이용한 재고관리(Inventory management) 애플리케이션입니다.

프로젝트 목표는 다음과 같이 설정했습니다.

## 프로젝트 목표

- Next.js + Prisma + PostgreSQL 기반 재고 관리 시스템 구축
- 사용자 인증(Authentification) 및 권한(Authorization) 관리 기능 포함
- 재고(Item), 사용자(User), 권한(Role/Permission) 등 CRUD 기능 포함
- RBAC(Role-Based Access Control)로 세분화된 접근 제어 구현
- UI는 shadcn + TailwindCSS를 기본 디자인 시스템으로 이용

## 핵심 기능

**1. 재고 관리(Inventory management)**

- 재고 품목(Item) CRUD
- 품목별 재고 수량 관리 (입, 출고 내역)
- 필터링 기능

**2. 사용자 관리(User management)**

- 사용자(User) CRUD
- Role 할당

**3. 권한(Role/Permission) 관리**

- Role CRUD
- Permission 정의 및 편집
- Role <-> Permission 매핑 관리

## 사용 기술 스택 요약

- **Frontend, Backend**: Next.js
- **ORM / Database**: Prisma ORM + PostgreSQL
- **UI**: shadcn + TailwindCSS
