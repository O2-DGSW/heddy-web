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

## HTTPS 개발 서버

데스크탑 개발 서버는 HTTPS로 실행됩니다.

```bash
pnpm dev:desktop
# https://localhost:5173
```

모바일 개발 서버와 Capacitor live reload는 WebView의 self-signed 인증서 차단을 피하기 위해 기본적으로 HTTP를 사용합니다. 모바일에서 HTTPS가 꼭 필요하면 환경 변수를 켜서 실행합니다.

```bash
ENABLE_HTTPS=true pnpm dev:mobile
# https://localhost:5174
```

첫 HTTPS 실행 시 로컬 self-signed 인증서가 `certs/`에 자동 생성됩니다. `openssl`이 없는 환경에서는 경고를 출력하고 HTTP로 폴백합니다.

Capacitor live reload URL을 직접 지정해야 하면 다음처럼 실행합니다.

```bash
CAPACITOR_SERVER_URL=http://<IP>:5174 pnpm dev:ios
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
