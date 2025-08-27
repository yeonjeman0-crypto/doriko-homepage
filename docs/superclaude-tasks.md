# SuperClaude 작업 계획 - DORIKO 홈페이지 최적화 & 통합

## 🎯 SuperClaude 담당 작업

### 1. 🏗️ 전체 아키텍처 설계
```yaml
structure:
  - index.html (최적화된 HTML 구조)
  - assets/
    - css/
      - critical.css (인라인용)
      - main.css (비동기 로드)
      - components/ (모듈화된 CSS)
    - js/
      - core.js (필수 기능)
      - components/ (컴포넌트별 JS)
      - vendors/ (외부 라이브러리)
    - images/
      - optimized/ (WebP, AVIF)
      - fallback/ (JPEG, PNG)
```

### 2. ⚡ 성능 최적화
- **Critical CSS 추출 및 인라인화**
  - Above-the-fold 컨텐츠만 인라인
  - 나머지는 비동기 로드
  
- **JavaScript 최적화**
  - Tree shaking
  - Code splitting
  - Dynamic imports
  - Webpack/Vite 번들링

- **이미지 최적화**
  - WebP/AVIF 변환
  - Responsive images (srcset)
  - Lazy loading 구현
  - Placeholder 이미지

- **폰트 최적화**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>
  ```

### 3. 🔍 SEO 최적화
```html
<!-- 구조화된 데이터 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DORIKO LIMITED",
  "url": "https://doriko.com",
  "logo": "https://doriko.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-2-1234-5678",
    "contactType": "customer service",
    "availableLanguage": ["Korean", "English"]
  }
}
</script>

<!-- Open Graph & Twitter Cards -->
<meta property="og:title" content="DORIKO - 해운 우수성과 안전 리더십">
<meta property="og:image" content="https://doriko.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

### 4. ♿ 접근성 개선
- ARIA 레이블 추가
- 키보드 네비게이션 최적화
- 스크린 리더 호환성
- Focus 관리
- Skip navigation 링크

### 5. 🌐 국제화 (i18n)
```javascript
const i18n = {
  ko: {
    hero: {
      title: "해운 우수성과 안전 리더십",
      subtitle: "글로벌 해운 서비스의 새로운 기준"
    }
  },
  en: {
    hero: {
      title: "Maritime Excellence & Safety Leadership",
      subtitle: "Setting New Standards in Global Shipping"
    }
  }
};
```

### 6. 📊 성능 모니터링
```javascript
// Core Web Vitals 측정
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Analytics로 전송
    gtag('event', 'web_vitals', {
      name: entry.name,
      value: Math.round(entry.value)
    });
  }
});

observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
```

### 7. 🔧 빌드 시스템 구성
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['gsap', 'aos'],
          'utils': ['./src/utils'],
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser'
  }
}
```

## 📝 통합 체크리스트

### Codex 작업물 검증
- [ ] 컴포넌트 기능 테스트
- [ ] 반응형 디자인 검증
- [ ] 애니메이션 성능 측정
- [ ] 크로스 브라우저 테스트

### 최적화 작업
- [ ] Lighthouse 점수 95+ 달성
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.8s

### 배포 준비
- [ ] 압축 (Gzip/Brotli)
- [ ] CDN 설정
- [ ] 캐싱 정책
- [ ] 에러 모니터링

## 🚀 최종 산출물

### 파일 구조
```
doriko-enhanced/
├── index.html (최적화된 메인 파일)
├── assets/
│   ├── css/
│   │   ├── critical.min.css
│   │   └── main.min.css
│   ├── js/
│   │   ├── app.min.js
│   │   └── vendor.min.js
│   └── images/
│       └── [최적화된 이미지들]
├── robots.txt
├── sitemap.xml
└── manifest.json
```

### 성능 목표
- 모바일 Lighthouse: 95+
- 데스크톱 Lighthouse: 98+
- 첫 페이지 로드: < 2초
- 상호작용 시간: < 100ms

---

**Codex 작업 완료 후 이 계획에 따라 최종 통합을 진행합니다.**