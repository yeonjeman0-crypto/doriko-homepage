# Codex 작업 지시서 - DORIKO 홈페이지 개선

## 🎯 목표
현재 `doriko-premium-blue-backup-1616.html` 파일을 모던하고 성능 최적화된 웹사이트로 개선

## 📝 Codex 담당 작업

### 1. Hero Section 컴포넌트 구현
```javascript
// 요구사항:
- 비디오 배경 with lazy loading
- IntersectionObserver 활용
- 타이핑 애니메이션 효과 (Typed.js 스타일)
- 패럴랙스 스크롤 효과
- 모바일에서는 이미지 폴백
```

### 2. Navigation 컴포넌트
```javascript
// 요구사항:
- 스크롤 시 배경색 변경
- 드롭다운 메뉴 (hover & click)
- 모바일 햄버거 메뉴 (slide-in)
- 활성 페이지 하이라이트
- 스크롤 진행률 표시기
```

### 3. Service Cards 섹션
```javascript
// 요구사항:
- CSS Grid 레이아웃
- 3D transform 호버 효과
- 아이콘 회전 애니메이션
- 카드 내용 확장 기능
- Lazy loading for images
```

### 4. 인터랙티브 애니메이션
```javascript
// 요구사항:
- Scroll-triggered animations
- Counter animation (0 to target number)
- Stagger effect for list items
- Smooth reveal animations
- Performance: requestAnimationFrame 사용
```

### 5. 반응형 CSS 구현
```css
/* 브레이크포인트 */
- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px - 1439px
- Large: 1440px+

/* 요구사항 */
- Fluid typography (clamp)
- Flexible grid system
- Touch-friendly buttons (min 44px)
- Optimized images (srcset)
```

### 6. 폼 컴포넌트
```javascript
// Contact Form 요구사항:
- Real-time validation
- Error messages (한국어/영어)
- Submit animation
- Success/Error feedback
- Accessibility (ARIA labels)
```

## 🎨 디자인 시스템

### 색상 팔레트
```css
:root {
  --primary: #1e40af;
  --secondary: #3b82f6;
  --accent: #60a5fa;
  --success: #10b981;
  --warning: #f97316;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
}
```

### 타이포그래피
```css
/* Headings */
h1: clamp(2rem, 5vw, 3.5rem)
h2: clamp(1.5rem, 4vw, 2.5rem)
h3: clamp(1.25rem, 3vw, 2rem)

/* Body */
body: 16px, line-height: 1.6
small: 14px
```

### 스페이싱 시스템
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
--spacing-3xl: 4rem;
```

## 📦 필요한 라이브러리
- 애니메이션: GSAP 또는 AOS
- 아이콘: Font Awesome 6
- 폰트: Inter, Noto Sans KR
- 유틸리티: Intersection Observer API

## ⚡ 성능 체크리스트
- [ ] 이미지 최적화 (WebP, lazy loading)
- [ ] CSS/JS 최소화
- [ ] Critical CSS 인라인
- [ ] 폰트 프리로드
- [ ] 코드 스플리팅
- [ ] 캐싱 전략

## 🔧 구현 예시

### Hero Section 타이핑 효과
```javascript
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];

    if(this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    this.element.innerHTML = `<span class="typing">${this.text}</span>`;

    let typeSpeed = 200;
    if(this.isDeleting) typeSpeed /= 2;

    if(!this.isDeleting && this.text === fullText) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
```

### Scroll Animation
```javascript
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

## 📋 체크포인트
1. 모든 인터랙티브 요소는 키보드 접근 가능해야 함
2. 색상 대비는 WCAG AA 기준 충족
3. 모바일에서 터치 타겟은 최소 44x44px
4. 애니메이션은 prefers-reduced-motion 존중
5. 이미지는 적절한 alt 텍스트 포함

---

**이 작업을 완료한 후 SuperClaude가 최종 통합 및 최적화를 진행합니다.**