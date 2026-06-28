"use client";

import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState("/Where_Silk_Rests.mp3");
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const interactedRef = useRef(false);

  const handleAudioError = () => {
    if (audioSrc === "/Where_Silk_Rests.mp3") {
      console.log("Local Where_Silk_Rests.mp3 not found. Falling back to serene Mixkit spa music.");
      setAudioSrc("https://assets.mixkit.co/music/preview/mixkit-meditation-healing-131.mp3");
    }
  };

  const playWithFadeIn = (audioElement: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audioElement.volume = 0;
    audioElement.play()
      .then(() => {
        setIsPlaying(true);
        let vol = 0;
        fadeIntervalRef.current = setInterval(() => {
          vol = Math.min(1, vol + 0.05);
          audioElement.volume = vol;
          if (vol >= 1) {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          }
        }, 80); // Fades in over ~1.6 seconds
      })
      .catch((err) => console.log("Play failed:", err));
  };

  const pauseWithFadeOut = (audioElement: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    let vol = audioElement.volume;
    fadeIntervalRef.current = setInterval(() => {
      vol = Math.max(0, vol - 0.05);
      audioElement.volume = vol;
      if (vol <= 0) {
        audioElement.pause();
        setIsPlaying(false);
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 40); // Fades out over ~0.8 seconds
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (interactedRef.current) {
        cleanup();
        return;
      }
      if (audioRef.current && !isPlaying) {
        playWithFadeIn(audioRef.current);
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      cleanup();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    interactedRef.current = true;
    if (!audioRef.current) return;
    if (isPlaying) {
      pauseWithFadeOut(audioRef.current);
    } else {
      playWithFadeIn(audioRef.current);
    }
  };

  return (
    <div className={styles.page}>
      {/* ① Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logoImg}
            src="/르보드레2.png"
            alt="Le Bodre Logo"
            width={120}
            height={45}
            priority
          />
          <span className={styles.logoText}>Le Bodre : L&apos;esthétique</span>
        </div>
        <nav className={styles.nav}>
          <a href="#story" className={styles.navLink}>브랜드 스토리</a>
          <a href="#services" className={styles.navLink}>프리미엄 서비스</a>
          <a href="#reviews" className={styles.navLink}>고객 후기</a>
          <a href="#instagram" className={styles.navLink}>갤러리</a>
        </nav>
        <a
          href="https://open.kakao.com/o/se93DXwi"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.headerCta}
        >
          예약 문의
        </a>
      </header>

      {/* ② Hero Section with Background Video */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          src="/강아지_캐릭터와_함께_편안하게_202606191538.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroContent} animate-fade-in-up`}>
          <p className={styles.heroSubtitle}>PREMIUM PET ESTHETIC & SPAS</p>
          <h1 className={styles.heroTitle}>
            우리 아이의 건강한 피부와 마음을 위한 다정한 쉼,
            <span className={styles.heroTitleHighlight}>
              르 보드레 레스테티크 프리미엄 펫 에스테틱 &amp; 아로마 스파
            </span>
          </h1>
          <a
            href="https://open.kakao.com/o/se93DXwi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroBtn}
          >
            스파 예약 및 상담하기
          </a>
        </div>
      </section>

      {/* ③ Brand Story Section (원장님의 철학) */}
      <section id="story" className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyContent}>
            <span className={styles.sectionLabel}>Brand Philosophy</span>
            <h2 className={styles.storyTitle}>
              미용실만 다녀오면 구석에 숨거나<br />
              피부를 긁는 아이 때문에 속상하셨나요?
            </h2>
            <p className={styles.storyDesc}>
              대다수의 반려동물은 낯선 환경과 자극적인 기계음 속에서 극도의 스트레스를 받습니다. 
              르 보드레 레스테티크는 아이들을 서두르게 다루지 않습니다. 
              아이들의 눈높이에서 교감하고, 그들의 속도에 맞추는 **슬로우 케어(Slow Care)**를 지향합니다.
            </p>
            <p className={styles.storyHighlight}>
              &ldquo;자극적인 인공 성분을 배제하고, 프랑스산 천연 아로마 원료를 사용하여 
              현장에서 직접 개별 처방 및 조제한 맞춤형 케어로 아이들의 피부와 영혼에 깊은 안식처를 선물합니다.&rdquo;
            </p>
          </div>
          <div className={styles.storyImageWrapper}>
            <Image
              className={styles.storyImage}
              src="/mixboard-image.png"
              alt="Pet spa philosophy representation"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ④ Premium Service Section */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Our Premium Services</span>
          <h2 className={styles.sectionTitle}>르 보드레의 특별한 슬로우 케어</h2>
          <p className={styles.sectionDesc}>
            아이의 피부 타입과 컨디션에 맞추어 세심하게 제안되는 천연 케어 솔루션입니다.
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {/* Card 1: 프리미엄 아로마 스파 */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceImgWrapper}>
              <Image
                className={styles.serviceImg}
                src="/mixboard-image (1).png"
                alt="Premium Aroma Spa"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className={styles.serviceContent}>
              <h3 className={styles.serviceCardTitle}>프리미엄 아로마 스파</h3>
              <p className={styles.serviceCardDesc}>
                각질 및 노폐물을 효과적으로 제거하고 모질을 부드럽게 개선합니다. 프랑스 천연 아로마 테라피가 결합되어 스파 시간 동안 정서적 안정과 깊은 휴식을 선사합니다.
              </p>
            </div>
          </div>

          {/* Card 2: 릴랙싱 마사지 */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceImgWrapper}>
              <Image
                className={styles.serviceImg}
                src="/mixboard-image (2).png"
                alt="Relaxing Massage"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className={styles.serviceContent}>
              <h3 className={styles.serviceCardTitle}>릴랙싱 마사지</h3>
              <p className={styles.serviceCardDesc}>
                관절 건강을 지켜주고 뭉친 근육을 세심하게 풀어주는 마사지 요법입니다. 숙련된 테라피스트의 따뜻한 터치를 통해 스트레스를 해소하고 순환을 돕습니다.
              </p>
            </div>
          </div>

          {/* Card 3: 커스텀 아로마 스킨케어 */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceImgWrapper}>
              <Image
                className={styles.serviceImg}
                src="/mixboard-image (3).png"
                alt="Custom Aroma Skincare"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className={styles.serviceContent}>
              <h3 className={styles.serviceCardTitle}>커스텀 아로마 스킨케어</h3>
              <p className={styles.serviceCardDesc}>
                아이의 피부 체질과 가려움, 건조함 정도를 진단하여 매장에서 직접 블렌딩하는 1:1 맞춤 스킨케어입니다. 지속적인 보습막을 형성하여 피부 장벽 강화를 돕습니다.
              </p>
            </div>
          </div>

          {/* Card 4: 프라이빗 슬로우 그루밍 */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceImgWrapper}>
              <Image
                className={styles.serviceImg}
                src="/mixboard-image (4).png"
                alt="Private Slow Grooming"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className={styles.serviceContent}>
              <h3 className={styles.serviceCardTitle}>프라이빗 슬로우 그루밍</h3>
              <p className={styles.serviceCardDesc}>
                서두르지 않고 아이의 스트레스 징후를 먼저 살피는 미용 케어입니다. 소음이 적은 친환경 도구를 사용하여 안전하고 안락한 미용 경험을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ⑤ Customer Reviews Section (Social Proof) */}
      <section id="reviews" className={styles.reviewsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Customer Testimonials</span>
          <h2 className={styles.sectionTitle}>르 보드레와 함께한 감동의 순간들</h2>
          <p className={styles.sectionDesc}>
            스파를 마친 후 아이들의 온화한 변화를 직접 겪은 견주님들의 솔직한 후기입니다.
          </p>
        </div>
        <div className={styles.reviewsContainer}>
          {/* Review 1 */}
          <div className={styles.reviewCard}>
            <div className={styles.reviewStars}>★★★★★</div>
            <p className={styles.reviewText}>
              &ldquo;미용실만 다녀오면 하루 종일 밥도 안 먹고 떨던 아이였는데, 르 보드레 스파를 다녀온 후에는 신기하게 평소처럼 활발해요! 천연 아로마 향이 매장 가득 퍼져서 저까지 힐링되는 기분이었습니다.&rdquo;
            </p>
            <div className={styles.reviewUser}>
              <span className={styles.reviewUserName}>김*민 고객님</span>
              <span className={styles.reviewUserPet}>푸들 코코 (3세)</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className={styles.reviewCard}>
            <div className={styles.reviewStars}>★★★★★</div>
            <p className={styles.reviewText}>
              &ldquo;아토피 때문에 피부를 계속 긁어서 각질이 가득했는데 원장님이 추천해주신 스킨케어 제품과 아로마 온천 스파 덕분에 엄청 보송보송해졌어요. 아이 피부 장벽이 튼튼해지는 게 눈으로 보입니다!&rdquo;
            </p>
            <div className={styles.reviewUser}>
              <span className={styles.reviewUserName}>이*서 고객님</span>
              <span className={styles.reviewUserPet}>말티즈 구름이 (5세)</span>
            </div>
          </div>

          {/* Review 3 */}
          <div className={styles.reviewCard}>
            <div className={styles.reviewStars}>★★★★★</div>
            <p className={styles.reviewText}>
              &ldquo;항상 미용 전 대기실부터 으르렁거리고 예민해서 미용실 가기가 겁났는데, 르 보드레는 아이의 호흡에 맞춰서 천천히 다가가 주는 게 느껴져요. 정말 프리미엄 케어가 뭔지 확실히 실감하고 가요.&rdquo;
            </p>
            <div className={styles.reviewUser}>
              <span className={styles.reviewUserName}>박*호 고객님</span>
              <span className={styles.reviewUserPet}>비숑 솜이 (2세)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ Instagram Section (Behold Placeholder & Link) */}
      <section id="instagram" className={styles.instagramSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Instagram Gallery</span>
          <h2 className={styles.sectionTitle}>일상 속 르 보드레 순간들</h2>
          <a
            href="https://instagram.com/bodredog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaHandle}
          >
            @bodredog ➔
          </a>
          <p className={styles.sectionDesc}>
            지금 이 순간, 르 보드레에서 온전한 휴식을 즐기고 있는 아이들을 만나보세요.
          </p>
        </div>
        {/* @ts-ignore */}
        <behold-widget feed-id="f0hZVynFI7lbuVLSHYBB" className={styles.instagramGrid}>
          {/* Insta Post 1 */}
          <div className={styles.instaPost}>
            <Image
              className={styles.instaPostImg}
              src="/mixboard-image (5).png"
              alt="Instagram Post 1"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className={styles.instaOverlay}>
              온전한 쉼을 누리고 있는 코코의 스파 타임 🛁✨ #르보드레
            </div>
          </div>

          {/* Insta Post 2 */}
          <div className={styles.instaPost}>
            <Image
              className={styles.instaPostImg}
              src="/mixboard-image (6).png"
              alt="Instagram Post 2"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className={styles.instaOverlay}>
              맞춤 아로마 솔루션 처방 중 🌿🔬 #펫아로마테라피
            </div>
          </div>

          {/* Insta Post 3 */}
          <div className={styles.instaPost}>
            <Image
              className={styles.instaPostImg}
              src="/mixboard-image.png"
              alt="Instagram Post 3"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className={styles.instaOverlay}>
              그루밍 후 한결 가벼워진 표정의 솜이 🌸🐶 #슬로우그루밍
            </div>
          </div>
        {/* @ts-ignore */}
        </behold-widget>
        <Script
          src="https://w.behold.so/widget.js"
          type="module"
          strategy="afterInteractive"
        />
      </section>

      {/* ⑦ Sticky Bottom CTA Button */}
      <div className={styles.stickyCtaContainer}>
        <a
          href="https://open.kakao.com/o/se93DXwi"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.stickyCtaBtn}
        >
          <span className={styles.stickyCtaIcon} />
          카카오톡 채널로 우리 아이 맞춤형 스파 상담받기
        </a>
      </div>

      {/* ⑧ Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInfo}>
            <span className={styles.footerLogo}>
              Le Bodre <span className={styles.footerLogoSpan}>L&apos;esthétique</span>
            </span>
            <p className={styles.footerDesc}>
              르 보드레 레스테티크는 자연 친화적 스킨케어와<br />
              아이들과의 교감을 최우선으로 생각하는 프리미엄 살롱입니다.
            </p>
            <p className={styles.footerCopyright}>
              &copy; 2026 Le Bodre L&apos;esthétique. All rights reserved.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>영업 시간</h4>
            <ul className={styles.footerList}>
              <li><strong>매일:</strong> 10:00 AM - 08:00 PM</li>
              <li>* 100% 프라이빗 예약제로 운영됩니다.</li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>고객 센터 및 위치</h4>
            <ul className={styles.footerList}>
              <li><strong>상담 예약:</strong> 카카오톡 채널 @bodredog</li>
              <li><strong>위치:</strong> 바탕화면 프로젝트 내 르보드레 센터</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating BGM Player */}
      <div className={styles.bgmPlayerContainer}>
        <button 
          onClick={togglePlay} 
          className={styles.bgmPlayBtn}
          aria-label="Toggle Background Music"
          title={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.bgmIconSvg}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className={styles.waveOuter} />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className={styles.waveInner} />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.bgmIconSvg}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
        <audio
          ref={audioRef}
          src={audioSrc}
          onError={handleAudioError}
          loop
          preload="auto"
        />
      </div>
    </div>
  );
}
