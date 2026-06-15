# heddy

## iOS 네이티브 빌드 전 필수 설정

> iOS 프로젝트(`ios/`)는 `.gitignore`에 포함되어 있어 클론 후 아래 설정을 수동으로 추가해야 합니다.

**`ios/App/App/Info.plist`** 에 카메라 권한 항목 추가 (QR 스캔 기능에 필요):

```xml
<key>NSCameraUsageDescription</key>
<string>QR 코드 스캔을 위해 카메라 접근이 필요합니다.</string>
```

## 모바일 개발 환경 설정
```bash
# iOS 플랫폼 최초 추가
pnpm ios

# Android 플랫폼 최초 추가
pnpm android

```

## 개발 환경 실행

```bash
# 데스크탑
pnpm dev:desktop

# 모바일
pnpm dev:mobile

# iOS
pnpm dev:ios

# Android
pnpm dev:android
```

## 빌드

```bash
# 데스크탑
pnpm build:desktop

# 모바일
pnpm build:mobile

# iOS
pnpm build:ios

# Android
pnpm build:android
```

## 빌드 결과물 미리보기

```bash
pnpm preview:desktop
pnpm preview:mobile
```