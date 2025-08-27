# 🔍 Codex 코드 검토 체크리스트

## ⚠️ Codex가 자주 하는 실수들

### 1. 🐛 JavaScript 관련
- [ ] **이벤트 리스너 중복 등록** - 메모리 누수 주의
- [ ] **비동기 처리 미흡** - async/await 누락
- [ ] **에러 처리 부재** - try/catch 블록 필요
- [ ] **전역 변수 남발** - 네임스페이스 오염
- [ ] **this 바인딩 문제** - 화살표 함수 vs 일반 함수
- [ ] **메모리 누수** - removeEventListener 누락

### 2. 🎨 CSS 관련
- [ ] **!important 남용** - 스타일 우선순위 꼬임
- [ ] **하드코딩된 값** - CSS 변수 미사용
- [ ] **벤더 프리픽스 누락** - 크로스 브라우저 이슈
- [ ] **미디어 쿼리 중복** - 비효율적인 코드
- [ ] **z-index 지옥** - 레이어 관리 실패
- [ ] **불필요한 복잡도** - 과도한 셀렉터 체이닝

### 3. ⚡ 성능 관련
- [ ] **무거운 애니메이션** - transform 대신 position 사용
- [ ] **리플로우/리페인트 유발** - 레이아웃 스래싱
- [ ] **이미지 최적화 미흡** - 원본 크기 그대로 사용
- [ ] **불필요한 DOM 조작** - 배치 처리 미사용
- [ ] **폴링 남용** - requestAnimationFrame 미사용
- [ ] **메모리 관리 실패** - 객체 재사용 미흡

### 4. ♿ 접근성 관련
- [ ] **ARIA 레이블 누락** - 스크린 리더 지원 미흡
- [ ] **키보드 네비게이션 불가** - tabindex 미설정
- [ ] **색상 대비 부족** - WCAG 기준 미달
- [ ] **포커스 표시 제거** - outline: none 남용
- [ ] **의미 없는 마크업** - div 남발
- [ ] **alt 텍스트 부재** - 이미지 설명 누락

### 5. 📱 반응형 관련
- [ ] **모바일 미고려** - 데스크톱만 작동
- [ ] **터치 이벤트 누락** - 모바일 인터랙션 불가
- [ ] **viewport 설정 오류** - 확대/축소 문제
- [ ] **고정 크기 사용** - px만 사용, rem/em 미사용
- [ ] **오버플로우 문제** - 가로 스크롤 발생
- [ ] **터치 타겟 크기** - 44px 미만

## 🔧 즉시 수정이 필요한 패턴들

### 1. 이벤트 리스너 메모리 누수
```javascript
// ❌ 잘못된 코드
element.addEventListener('click', function() {
  // 익명 함수는 제거 불가
});

// ✅ 수정된 코드
const handleClick = (e) => {
  // 처리 로직
};
element.addEventListener('click', handleClick);
// 나중에 제거 가능
element.removeEventListener('click', handleClick);
```

### 2. 애니메이션 성능
```css
/* ❌ 잘못된 코드 */
.box {
  transition: left 0.3s, top 0.3s; /* 리플로우 유발 */
}

/* ✅ 수정된 코드 */
.box {
  transition: transform 0.3s; /* GPU 가속 */
  will-change: transform;
}
```

### 3. 비동기 에러 처리
```javascript
// ❌ 잘못된 코드
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ✅ 수정된 코드
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    // 폴백 처리
    return null;
  }
}
```

### 4. DOM 조작 최적화
```javascript
// ❌ 잘못된 코드
items.forEach(item => {
  container.innerHTML += `<div>${item}</div>`; // 매번 리플로우
});

// ✅ 수정된 코드
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const div = document.createElement('div');
  div.textContent = item;
  fragment.appendChild(div);
});
container.appendChild(fragment); // 한 번만 리플로우
```

### 5. 반응형 이미지
```html
<!-- ❌ 잘못된 코드 -->
<img src="hero.jpg" alt="Hero">

<!-- ✅ 수정된 코드 -->
<picture>
  <source media="(max-width: 768px)" srcset="hero-mobile.webp">
  <source media="(max-width: 1024px)" srcset="hero-tablet.webp">
  <source srcset="hero-desktop.webp">
  <img src="hero.jpg" alt="Hero image showing company ships" loading="lazy">
</picture>
```

## 📊 성능 메트릭 체크

### Core Web Vitals 목표
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s

### 번들 크기 목표
- **HTML**: < 14KB (gzipped)
- **CSS**: < 20KB (critical), < 50KB (total)
- **JS**: < 35KB (initial), < 100KB (total)
- **폰트**: < 100KB (subset)
- **이미지**: < 200KB per image

## 🚀 최종 검증 스크립트

```javascript
// 성능 검증
const checkPerformance = () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Load Time:', perfData.loadEventEnd - perfData.fetchStart);
  console.log('DOM Ready:', perfData.domContentLoadedEventEnd - perfData.fetchStart);
  console.log('First Paint:', performance.getEntriesByName('first-paint')[0]?.startTime);
};

// 메모리 누수 체크
const checkMemoryLeaks = () => {
  const observers = [];
  // MutationObserver, IntersectionObserver 등 체크
  console.log('Active Observers:', observers.length);
};

// 접근성 체크
const checkAccessibility = () => {
  const issues = [];
  
  // 이미지 alt 체크
  document.querySelectorAll('img:not([alt])').forEach(img => {
    issues.push(`Missing alt: ${img.src}`);
  });
  
  // 버튼 aria-label 체크
  document.querySelectorAll('button:not([aria-label])').forEach(btn => {
    if (!btn.textContent.trim()) {
      issues.push('Button without label');
    }
  });
  
  console.log('Accessibility Issues:', issues);
};
```

---

**Codex 작업물이 도착하면 이 체크리스트로 검토 후 수정하겠습니다!**