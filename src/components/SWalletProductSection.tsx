import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  ArrowUpRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../utils/analytics';

type ColorKey = 'black' | 'brown';

interface ColorVariant {
  id: ColorKey;
  label: string;
  subtitle: string;
  hex: string;
  images: Array<{ src: string; alt: string }>;
}

const S_WALLET_VARIANTS: Record<ColorKey, ColorVariant> = {
  black: {
    id: 'black',
    label: 'Black',
    subtitle: 'Slim wallet, crazyhorse leather · Đen',
    hex: '#181A19',
    images: [
      {
        src: '/assets/aistudio/IMG_0431_7aa0c58b.jpg',
        alt: 's-wallet màu Đen — mặt trước đóng gọn với logo The Wing dập chìm',
      },
      {
        src: '/assets/aistudio/IMG_0442_1427ea77.jpg',
        alt: 's-wallet màu Đen — cầm trên tay thể hiện kích thước 8 × 10 × 1 cm',
      },
      {
        src: '/assets/aistudio/IMG_0412_99f845a0.jpg',
        alt: 's-wallet màu Đen — mặt sau với ngăn thẻ ngoài ví lấy nhanh',
      },
      {
        src: '/assets/aistudio/IMG_0422_ead7235f.jpg',
        alt: 's-wallet màu Đen — góc hé mở nắp nam châm đóng giữ phom ví',
      },
      {
        src: '/assets/aistudio/IMG_0397_3f9db59a.jpg',
        alt: 's-wallet màu Đen — góc mở bên trong lộ ngăn ẩn có dây kéo nhanh pull-tab',
      },
      {
        src: '/assets/aistudio/IMG_0379_97ace60c.jpg',
        alt: 's-wallet màu Đen — mở phẳng bên trong với các ngăn thẻ và ngăn tiền mở 2 chiều',
      },
      {
        src: '/assets/aistudio/IMG_0372_20c24858.jpg',
        alt: 's-wallet màu Đen — toàn cảnh sức chứa bên trong cùng thẻ và tiền mặt',
      },
    ],
  },
  brown: {
    id: 'brown',
    label: 'Brown',
    subtitle: 'Slim wallet, crazyhorse leather · Nâu',
    hex: '#6E4733',
    images: [
      {
        src: '/assets/aistudio/IMG_0366_8ba2cebb.jpg',
        alt: 's-wallet màu Nâu — mặt trước đóng gọn với logo The Wing dập chìm',
      },
      {
        src: '/assets/aistudio/IMG_0441_7529ca93.jpg',
        alt: 's-wallet màu Nâu — cầm trên tay thể hiện kích thước 8 × 10 × 1 cm',
      },
      {
        src: '/assets/aistudio/IMG_0414_5879957d.jpg',
        alt: 's-wallet màu Nâu — mặt sau với ngăn thẻ ngoài ví lấy nhanh',
      },
      {
        src: '/assets/aistudio/IMG_0423_37c83f09.jpg',
        alt: 's-wallet màu Nâu — góc hé mở nắp nam châm đóng giữ phom ví',
      },
      {
        src: '/assets/aistudio/IMG_0388_8f2f3bcd.jpg',
        alt: 's-wallet màu Nâu — góc mở bên trong lộ ngăn ẩn có dây kéo nhanh pull-tab',
      },
      {
        src: '/assets/aistudio/IMG_0383_c104a787.jpg',
        alt: 's-wallet màu Nâu — mở phẳng bên trong với các ngăn thẻ và ngăn tiền mở 2 chiều',
      },
      {
        src: '/assets/aistudio/20260907_0001_d7c7e5e3.jpg',
        alt: 's-wallet màu Nâu — toàn cảnh sức chứa bên trong cùng thẻ và tiền mặt',
      },
    ],
  },
};

const DESIGN_FEATURES = [
  '4 ngăn đựng thẻ: 1 ngăn ẩn có dây kéo nhanh (pull-tab) và 1 ngăn ngoài ví',
  'Ngăn tiền mở 2 chiều, giúp bạn lấy tiền nhanh gọn',
  'Nam châm đóng, shape ví luôn gọn gàng',
];

export const SWalletProductSection: React.FC = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorKey>('black');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<'patina' | 'order' | null>(
    'patina'
  );

  // Lock background scroll and allow Escape key to close detail view
  useEffect(() => {
    if (!isDetailOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDetailOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailOpen]);

  const openProductDetail = (color: ColorKey) => {
    setSelectedColor(color);
    setActiveImageIdx(0);
    setIsDetailOpen(true);
    trackEvent('view_item', {
      item_id: 's-wallet',
      item_name: 's-wallet',
      item_variant: color,
      currency: 'VND',
      value: 550000,
    });
  };

  const variant = S_WALLET_VARIANTS[selectedColor];
  const currentImage = variant.images[activeImageIdx] ?? variant.images[0];

  const handleSelectColor = (color: ColorKey) => {
    setSelectedColor(color);
    setActiveImageIdx((prev) =>
      Math.min(prev, S_WALLET_VARIANTS[color].images.length - 1)
    );
    trackEvent('select_content', {
      content_type: 'product_color',
      item_id: 's-wallet',
      item_variant: color,
    });
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) =>
      prev === 0 ? variant.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIdx((prev) =>
      prev === variant.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="products"
      aria-labelledby="products-showcase-heading"
      className="bg-white text-[#111816] py-16 sm:py-24"
    >
      {/* Clean Nike Product Shelf Layout — Single s-wallet product card */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Row: Heading Left + "Shop" Trigger Right */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2
            id="products-showcase-heading"
            className="text-xl sm:text-2xl font-medium tracking-[-0.015em] text-[#111816]"
          >
            Everyday Essentials
          </h2>

          <button
            type="button"
            onClick={() => openProductDetail('black')}
            className="text-sm sm:text-base font-medium text-[#111816] hover:text-[#FF6B00] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
          >
            Shop
          </button>
        </div>

        {/* Single s-wallet Card with Background-Removed Cover Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => openProductDetail('black')}
            className="group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
            aria-label="Xem chi tiết sản phẩm s-wallet"
          >
            <div className="w-full aspect-[4/4.3] bg-[#F5F5F5] flex items-center justify-center p-8 sm:p-10 overflow-hidden">
              <img
                src="/assets/aistudio/s_wallet_cover_cutout.png"
                alt="s-wallet — Slim wallet, crazyhorse leather"
                className="w-full h-full object-contain drop-shadow-[0_14px_24px_rgba(17,24,22,0.12)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="pt-3.5 sm:pt-4 space-y-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base sm:text-[17px] font-medium text-[#111816] lowercase group-hover:text-[#FF6B00] transition-colors">
                  s-wallet
                </h3>
                <div className="flex items-center gap-1.5" aria-label="2 màu: Black và Brown">
                  <span
                    className="w-3 h-3 rounded-full bg-[#181A19] ring-1 ring-black/15"
                    title="Black"
                  />
                  <span
                    className="w-3 h-3 rounded-full bg-[#6E4733] ring-1 ring-black/15"
                    title="Brown"
                  />
                </div>
              </div>
              <p className="text-sm sm:text-[15px] text-[#707072]">
                Slim wallet, crazyhorse leather · 2 Colors
              </p>
              <p className="pt-1.5 text-base sm:text-[17px] font-medium text-[#111816] tabular-nums">
                550.000 VNĐ
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* White-background, black-text closing statement inside section#products */}
      <div className="bg-white text-black mt-20 sm:mt-28 pt-16 sm:pt-24 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h3 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold uppercase tracking-[-0.03em] leading-[1.08] text-black">
            THE BEST IS YET TO COME
          </h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base font-normal text-black">
            maybe never come so we will keep creating!!!
          </p>
        </div>
      </div>

      {/* Nike Product Detail Page Overlay — Shown ONLY when user clicks a product card */}
      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdp-title-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-white text-[#111816] overflow-y-auto"
          >
            {/* Sticky PDP Return Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-black/10">
              <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#111816] hover:text-[#FF6B00] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm py-1"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Quay lại</span>
                </button>

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#707072]">
                  s-wallet · {variant.label}
                </span>

                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  aria-label="Đóng chi tiết sản phẩm"
                  className="w-9 h-9 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center text-[#111816] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Nike PDP Content */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Sticky Dual-Pane Gallery */}
                <div className="lg:col-span-7 lg:sticky lg:top-20">
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                    {/* Vertical Thumbnail Strip */}
                    <div
                      className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 shrink-0"
                      role="tablist"
                      aria-label="Product gallery angles"
                    >
                      {variant.images.map((img, idx) => {
                        const isActive = idx === activeImageIdx;
                        return (
                          <button
                            key={img.src}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Xem góc ảnh ${idx + 1} (${variant.label})`}
                            onClick={() => setActiveImageIdx(idx)}
                            onMouseEnter={() => setActiveImageIdx(idx)}
                            className={`relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-md overflow-hidden bg-[#F5F5F5] shrink-0 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                              isActive
                                ? 'ring-2 ring-[#111816] opacity-100'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={img.src}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Main Stage */}
                    <div className="relative flex-1 aspect-[4/5] bg-[#F5F5F5] rounded-lg overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${selectedColor}-${activeImageIdx}`}
                          src={currentImage.src}
                          alt={currentImage.alt}
                          referrerPolicy="no-referrer"
                          initial={{ opacity: 0.35 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.35 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          aria-label="Ảnh trước"
                          className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#111816] shadow-sm flex items-center justify-center transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                        >
                          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          aria-label="Ảnh tiếp theo"
                          className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#111816] shadow-sm flex items-center justify-center transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                        >
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Complete Product Details */}
                <div className="lg:col-span-5">
                  <div>
                    <h2
                      id="pdp-title-heading"
                      className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#111816] lowercase"
                    >
                      s-wallet
                    </h2>
                    <p className="mt-1 text-base text-[#707072]">
                      Slim wallet, crazyhorse leather
                    </p>
                    <p className="mt-4 text-lg font-semibold text-[#111816] tabular-nums">
                      550.000 VNĐ
                    </p>
                  </div>

                  {/* Colorway Thumbnail Switcher */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-medium text-[#111816]">
                        Màu sắc:{' '}
                        <span className="text-[#707072] font-normal">
                          {variant.label}
                        </span>
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-3"
                      role="radiogroup"
                      aria-label="Chọn màu s-wallet"
                    >
                      {(['black', 'brown'] as ColorKey[]).map((key) => {
                        const item = S_WALLET_VARIANTS[key];
                        const isSelected = selectedColor === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={`Chọn màu ${item.label}`}
                            onClick={() => handleSelectColor(key)}
                            className={`relative w-[72px] h-[72px] rounded-md overflow-hidden bg-[#F5F5F5] cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                              isSelected
                                ? 'ring-2 ring-[#111816] ring-offset-2'
                                : 'ring-1 ring-black/10 hover:ring-black/35'
                            }`}
                          >
                            <img
                              src={item.images[0].src}
                              alt={item.label}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover scale-[1.45]"
                            />
                            <span className="sr-only">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Primary Order CTA */}
                  <div className="mt-7">
                    <a
                      href="https://www.instagram.com/thewing_labs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('begin_checkout', {
                          item_id: 's-wallet',
                          item_name: 's-wallet',
                          item_variant: selectedColor,
                          currency: 'VND',
                          value: 550000,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#111816] text-white text-sm sm:text-base font-medium hover:bg-[#FF6B00] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Nhắn tin đặt hàng</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Quote */}
                  <div className="mt-8 pt-6 border-t border-black/10">
                    <p className="text-base font-medium italic text-[#111816]">
                      &ldquo;Thuận tiện, nhỏ gọn và cổ điển&rdquo;
                    </p>
                    <p className="mt-1 text-sm text-[#111816]/80">
                      Một chiếc ví thoải mái dùng hằng ngày.
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="mt-6 space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#111816]">
                    <p>
                      <span className="font-semibold">Kích thước:</span> rộng 8
                      × dài 10 × dày 1 (cm)
                    </p>
                    <p>
                      <span className="font-semibold">Da:</span> bò sáp (crazy
                      horse)
                    </p>
                    <div>
                      <p className="font-semibold">Thiết kế:</p>
                      <ul className="mt-2 space-y-1.5 pl-4 list-disc text-[#111816]/85">
                        {DESIGN_FEATURES.map((feat) => (
                          <li key={feat}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="mt-8 border-t border-black/10 divide-y divide-black/10">
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenAccordion((prev) =>
                            prev === 'patina' ? null : 'patina'
                          )
                        }
                        aria-expanded={openAccordion === 'patina'}
                        className="w-full py-5 flex items-center justify-between text-left text-base font-medium text-[#111816] hover:text-[#9E5331] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                      >
                        <span>Hiệu ứng chuyển màu Patina</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openAccordion === 'patina' ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openAccordion === 'patina' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 text-sm sm:text-[15px] leading-relaxed text-[#111816]/80">
                              Thêm một điều nữa, hiệu ứng chuyển màu khi dùng
                              qua thời gian (patina) là thứ mà s-wallet muốn khoe
                              với bạn. Vì sự đặc biệt trong cách xử lí da và lớp
                              sáp phủ, da crazy horse sẽ thay đổi về kết cấu qua
                              những tác động bên ngoài từ từng cái chạm tay, ánh
                              sáng, va chạm. Từ đó, ví sẽ hình thành những vệt
                              màu sáng tối khác nhau, trở nên độc nhất và mang
                              đậm tính cá nhân của bạn.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="border-b border-black/10">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenAccordion((prev) =>
                            prev === 'order' ? null : 'order'
                          )
                        }
                        aria-expanded={openAccordion === 'order'}
                        className="w-full py-5 flex items-center justify-between text-left text-base font-medium text-[#111816] hover:text-[#9E5331] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                      >
                        <span>Đặt hàng &amp; Xuất xứ</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openAccordion === 'order' ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openAccordion === 'order' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pb-5 space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#111816]/80">
                              <p>
                                Bạn đặt hàng bằng cách nhắn tin cho tụi mình ha!
                                (hoặc nếu bạn có bất kì thắc mắc nào thì thoải
                                mái ping The Wing qua tin nhắn hoặc ở phần
                                comment ạ)
                              </p>
                              <p className="font-medium text-[#111816]">
                                Và cuối cùng, s-wallet được tụi mình thiết kế và
                                sản xuất tại Việt Nam!
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
