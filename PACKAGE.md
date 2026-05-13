# heddy - package 사용 방법

## 1. design-tokens

### import 방법
```bash
import { lightTheme, font } from "@design-tokens";
```

### theme(lightTheme) 사용 예시
```bash
## 사용 예시

<div className={lightTheme.label.normal} />
```


### font 사용 예시

```bash
<p className={font.body.normal}>용!</p>
```


## 2. API 사용

### featNameApi.ts 예시 (실제 getData 코드)
```bash
# 개발 중인 기능이 해당 Api를 설정한 객체가 됩니다.
export const featNameApi = {
  # 사용할 메소드가 앞에 오고 뒤에는 해당 기능 이름이 네이밍됩니다.
  getFeatName: async () => {
    const result = await api.get<ApiResponse<FeatNameResponse>>('/user/name')
    return result.data
  },
}
```

### featNameApi.types.ts 예시
```bash
# 서버에서 데이터만 받아온다면 Response, 요청을 하는 행위가 있다면 Request로 네이밍 합니다.
# 그 외 배열 인자 타입 지정 등 다른 요소들은 먼저 개발을 하고 리뷰 받을 때 수정하거나 적용합니다.
export type FeatNameResponse {
  name: string
  description: string
}
```
